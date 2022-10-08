import { SearchAdDto } from './dto/search-ad.dto';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ad, AdsDocument } from 'src/schemas/ads.schema';
import { getData } from 'src/utils/change-query';

@Injectable()
export class AdsService {
  constructor(@InjectModel(Ad.name) private adsModel: Model<AdsDocument>) {}

  async findAll(query: SearchAdDto): Promise<Ad[]> {
    const data = getData(query);

    return this.adsModel.find(data).sort({ date: -1 });
  }

  async findOne(id: string): Promise<Ad> {
    return this.adsModel.findOne({ _id: id });
  }

  async create(createAdDto: CreateAdDto): Promise<Ad> {
    const createdAd = new this.adsModel(createAdDto);
    return createdAd.save();
  }

  async update(updateAdDto: UpdateAdDto, id: string): Promise<Ad> {
    await this.adsModel.updateOne({ _id: id }, { $set: { ...updateAdDto } });
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.adsModel.deleteOne({ _id: id });
  }
}
