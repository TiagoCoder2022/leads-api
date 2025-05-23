import { Handler } from "express";
import { prisma } from "../database";
import {
  CreateLeadRequestSchema,
  GetLeadsRequestSchema,
  UpdateLeadRequestSchema,
} from "./schemas/LeadsRequestSchema";
import { HttpError } from "../erros/HttpError";
import { Prisma } from "../generated/prisma";
import {
  LeadsRepository,
  LeadWhereParams,
} from "../repositories/LeadsRepository";

export class LeadsController {
  private leadsRepository: LeadsRepository;

  constructor(leadsRepository: LeadsRepository) {
    this.leadsRepository = leadsRepository;
  }

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

      const limit = Number(page);
      const offset = (Number(page) - 1) * limit;

      const where: LeadWhereParams = {};

      if (name) where.name = { like: name, mode: "insensitive" };
      if (status) where.status = status;

      const leads = await this.leadsRepository.find({
        where,
        sortBy,
        order,
        limit,
        offset,
      });

      const total = await this.leadsRepository.count(where);

      res.json({
        data: leads,
        meta: {
          page: Number(page),
          pageSize: limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  };

  create: Handler = async (req, res, next) => {
    try {
      const body = CreateLeadRequestSchema.parse(req.body);
      if (!body.status) body.status = "New";

      const newLead = await this.leadsRepository.create(body);      

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