import { Handler } from "express";
import { GetLeadsRequestSchema } from "./schemas/LeadsRequestSchema";
import { AddLeadRequestSchema } from "./schemas/GroupsRequestSchema";
import { GroupsRepository } from "../repositories/GroupsRepository";
import {
  LeadsRepository,
  LeadWhereParams,
} from "../repositories/LeadsRepository";
import { GroupLeadsService } from "../services/GroupLeadsService";

export class GroupLeadsController {
  constructor(private readonly groupLeadsService: GroupLeadsService) {}
  getLeads: Handler = async (req, res, next) => {
    try {
      const groupId = Number(req.params.groupId);
      const query = GetLeadsRequestSchema.parse(req.query);
      const {
        page = "1",
        pageSize = "10",
        name,
        status,
        sortBy = "name",
        order = "asc",
      } = query;

      const leads = await this.groupLeadsService.getAllLeads({
        name,
        status,
        page: Number(page),
        pageSize: Number(pageSize),
        sortBy,
        order,
        groupId,
      });

      res.json(leads);
    } catch (error) {
      next(error);
    }
  };

  addLead: Handler = async (req, res, next) => {
    try {
      const groupId = Number(req.params.groupId);
      const { leadId } = AddLeadRequestSchema.parse(req.body);
      const updatedGroup = await this.groupLeadsService.addLeadToGroup(
        groupId,
        leadId
      );

      res.status(201).json(updatedGroup);
    } catch (error) {
      next(error);
    }
  };

  removeLead: Handler = async (req, res, next) => {
    try {
      const groupId = Number(req.params.groupId);
      const leadId = Number(req.params.leadId);
      const updatedGroup = await this.groupLeadsService.removeLeadFromGroup(
        groupId,
        leadId
      );

      res.json(updatedGroup);
    } catch (error) {
      next(error);
    }
  };
}
