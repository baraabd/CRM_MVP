import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateLeadDto) {
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

  findAll() {
    return this.prisma.lead.findMany({
      orderBy: { updatedAt: 'desc' },
      include: { ownerUser: true },
    });
  }

  findOne(id: string) {
    return this.prisma.lead.findUnique({
      where: { id },
      include: { ownerUser: true },
    });
  }
}
