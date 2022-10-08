import { JwtGuard } from './../auth/guards/jwt.guard';
import { AuthService } from './../auth/auth.service';
import { AdsService } from './ads.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-upload';
import { SearchAdDto } from './dto/search-ad.dto';

@Controller('ads')
export class AdsController {
  constructor(
    private readonly adsService: AdsService,
    private readonly authService: AuthService,
  ) {}

  // @UseGuards(JwtGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllAds(@Query() query: SearchAdDto, @Req() req, @Res() res) {
    const ads = await this.adsService.findAll(query);

    return res.send(ads);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getAd(@Param('id') id: string) {
    // const ad = await this.adsService.findOne(id);

    return await this.adsService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FilesInterceptor('attachment', 10, {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createAd(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createAdDto: CreateAdDto,
    @Req() req,
  ) {
    const user = await this.authService.getUserByTokenData(req.token);

    const attachment = [];

    files?.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      attachment.push(fileReponse);
    });

    return await this.adsService.create({
      ...createAdDto,
      userId: user._id as string,
      attachment,
    });
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateAd(@Body() updateAdDto: UpdateAdDto, @Param('id') id: string) {
    return await this.adsService.update(updateAdDto, id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteAd(@Param('id') id: string) {
    return await this.adsService.delete(id);
  }
}
