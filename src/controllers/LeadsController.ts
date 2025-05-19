import { Handler } from "express";
import { prisma } from "../database";
import {
  CreateLeadRequestSchema,
  GetLeadsRequestSchema,
  UpdateLeadRequestSchema,
} from "./schemas/LeadsRequestSchema";
import { HttpError } from "../erros/HttpError";
import { Prisma } from "../generated/prisma";

export class LeadsController {
  index: Handler = async (req, res, next) => {
    try {
      const query = GetLeadsRequestSchema.parse(req.query);
      const {
        page = "1",
        pageSize = "10",
        name,
        status,
        sortBy = "name",
        order = "asc",
      } = query;

      const pageNumber = Number(page);
      const pageSizeNumber = Number(pageSize);

      const where: Prisma.LeadWhereInput = {};

      if (name) where.name = { contains: name, mode: "insensitive" };
      if (status) where.status = status;

      const leads = await prisma.lead.findMany({
        where,
        skip: (pageNumber - 1) * pageSizeNumber,
        take: pageSizeNumber,
        orderBy: {
          [sortBy]: order,
        },
      });

      const totalLeads = await prisma.lead.count({ where });

      res.json({
        data: leads,
        meta: {
          page: pageNumber,
          pageSize: pageSizeNumber,
          total: totalLeads,
          totalPages: Math.ceil(totalLeads / pageSizeNumber),
        },
      });
    } catch (error) {
      next(error);
    }
  };

  create: Handler = async (req, res, next) => {
    try {
      const body = CreateLeadRequestSchema.parse(req.body);

      const newLead = await prisma.lead.create({
        data: body,
      });

      res.status(201).json(newLead);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const lead = await prisma.lead.findUnique({
        where: { id: Number(req.params.id) },
        include: {
          groups: true,
          campaigns: true,
        },
      });

      if (!lead) throw new HttpError(404, "lead nao encontrado");

      res.json(lead);
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const body = UpdateLeadRequestSchema.parse(req.body);

      const lead = await prisma.lead.findUnique({
        where: { id: Number(req.params.id) },
      });

      if (!lead) throw new HttpError(404, "lead nao encontrado");

      if (
        lead.status === "New" &&
        body.status !== undefined &&
        body.status !== "Contacted"
      ) {
        throw new HttpError(
          400,
          "um novo lead deve ser contatado antes de ter seu status atualizado para outros valores"
        );
      }

      if (body.status && body.status === "Archived") {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - lead.updatedAt.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 180)
          throw new HttpError(
            400,
            "Um lead só pode ser arquivado após 6 meses de inatividade"
          );
      }

      const updatedLead = await prisma.lead.update({
        data: body,
        where: { id: Number(req.params.id) },
      });

      res.json(updatedLead);
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const leadExists = await prisma.lead.findUnique({
        where: { id: Number(req.params.id) },
      });

      if (!leadExists) throw new HttpError(404, "lead nao encontrado");

      const detetedLead = await prisma.lead.delete({
        where: { id: Number(req.params.id) },
      });

      res.json({ detetedLead });
    } catch (error) {
      next(error);
    }
  };
}