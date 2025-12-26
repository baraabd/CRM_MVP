import { Injectable } from '@nestjs/common';
import type { Lead, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';

type LeadWithOwner = Lead & { ownerUser: User | null };

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLeadDto): Promise<Lead> {
    return this.prisma.lead.create({
      data: {
        businessName: dto.businessName,
        sector: dto.sector,
        city: dto.city,
        area: dto.area,
        addressLine: dto.addressLine,
        primaryName: dto.primaryName,
        primaryPhone: dto.primaryPhone,
        primaryEmail: dto.primaryEmail,
        ownerUserId: dto.ownerUserId,
      },
    });
  }

  async findAll(): Promise<LeadWithOwner[]> {
    return this.prisma.lead.findMany({
      orderBy: { updatedAt: 'desc' },
      include: { ownerUser: true },
    });
  }

  async findOne(id: string): Promise<LeadWithOwner | null> {
    return this.prisma.lead.findUnique({
      where: { id },
      include: { ownerUser: true },
    });
  }
}
