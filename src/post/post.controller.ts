import { Controller, Get, Request, Post, UseGuards, Body, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { RoleModerGuard } from 'src/roles/guard/rolesModer.guard';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { PostService } from './post.service';
// import { Roles } from "../roles/roles.decorator"
// import { Role } from 'src/enums/role.enum';
// import { RolesGuard } from 'src/roles/guard/roles.guard';


@Controller("Post")
export class PostController {
  constructor(private PostService: PostService) {}
  
  @Post('create-Post')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'imageView', maxCount: 1 },
    { name: 'video' },
    { name: "MassImgPost"},
    { name: "imgPost"},
    { name: "file"},
    { name: "audio"}
  ]))
  createPost(@UploadedFiles() files: { 

    imageView?  : Express.Multer.File[], 
    video?      : Express.Multer.File[], 
    MassImgPost?: Express.Multer.File[],
    imgPost?    : Express.Multer.File[],
    file?       : Express.Multer.File[],
    audio?      : Express.Multer.File[]

  }, @Request() req ) { 

    console.log(files);
    return this.PostService.createPost(req.body, req.user._doc._id , files)
  }

  @Post('get-Post')
  getPost(@Request() req) {
    return this.PostService.getPostQery(req);
  }

  @Post('get-PostID')
  @UseGuards(JwtAuthGuard)
  getPostID(@Request() req) {
    return this.PostService.getPostID(req);
  }

  @Get('get-PostProfile')
  @UseGuards(JwtAuthGuard)
  getPostProfile(@Request() req) {
    return this.PostService.getPostProfile(req);
  }

  @Post('deletePost')
  @UseGuards(RoleModerGuard)
  deletePostId(@Request() req) {
    return this.PostService.deletePostId(req);
  }
}
