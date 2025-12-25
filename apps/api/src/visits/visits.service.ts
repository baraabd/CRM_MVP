import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVisitDto } from './dto/create-visit.dto';

@Injectable()
export class VisitsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateVisitDto) {
    return this.prisma.visit.create({
      data: {
        leadId: dto.leadId,
        repUserId: dto.repUserId,
        checkInAt: dto.checkInAt ? new Date(dto.checkInAt) : undefined,
        checkInLat: dto.checkInLat,
        checkInLng: dto.checkInLng,
        checkOutAt: dto.checkOutAt ? new Date(dto.checkOutAt) : undefined,
        checkOutLat: dto.checkOutLat,
        checkOutLng: dto.checkOutLng,
        durationMinutes: dto.durationMinutes,
        outcomeResult: dto.outcomeResult,
        refusalReason: dto.refusalReason,
        formData: dto.formData ?? {},
      },
      include: { lead: true, repUser: true },
    });
  }

  findAll(leadId?: string) {
    return this.prisma.visit.findMany({
      where: leadId ? { leadId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { lead: true, repUser: true },
    });
  }
}
