import { Body, HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileService, FileType } from 'src/files/files.service';
import { CreateTovarDto } from './dto/post.dto';
import { Post, PostModel } from './post.schema';

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private PostModel: Model<PostModel>,
        private fileService   : FileService,
    ) {}

    async createPost(post , userId , files){        
        try{
            const postP = JSON.parse(post.body)

            for(let key in files)
            {
                
                if(key == "video")
                {
                    const masNameVideo = this.fileService.createMultiFile(FileType.VIDEOPOST , files.video )

                    for(let keyM of masNameVideo)
                    {
                        for(let keyb of postP.blocks)
                        {
                            if(keyb.type == "video")
                            {
                                if(!keyb.data.file)
                                {
                                   keyb.data.file = keyM
                                   break
                                }
                            }
                        }
                    }
                    continue
                }

                if(key == "MassImgPost")
                {
                    const masNameImgMas = this.fileService.createMultiFile(FileType.IMGPOSTMAS , files.MassImgPost )

                    for(let keyb of postP.blocks)
                    {
                        if(keyb.type == "image")
                        {
                            if(keyb.data.massImgSave && !keyb.data.massImg)
                            {

                                const masImg = []
                                let i = 0

                                for(let key of masNameImgMas)
                                {
                                    if(masImg.length < keyb.data.massImgSave.length )
                                    {
                                        const objM = {
                                            img:key,
                                            caption:keyb.data.massImgSave[i].caption
                                        }
                                         masImg.push(objM)
                                         i++
                                    } else {
                                        break
                                    }
                                }

                                keyb.data.massImg = masImg
                                
                            }
                        }
                    }
                    
                    continue
                }

                if(key == "imgPost")
                {
                    const masNameImg = this.fileService.createMultiFile(FileType.IMGPOST , files.imgPost )

                    for(let keyM of masNameImg)
                    {
                        for(let keyb of postP.blocks)
                        {
                            if(keyb.type == "image")
                            {
                                if(!keyb.data.file)
                                {
                                   keyb.data.file = keyM
                                   break
                                }
                            }
                        }
                    }
                    continue
                }
                
                if(key == "file")
                {
                    const masNameFile = this.fileService.createMultiFile(FileType.FILEPOST , files.file )

                    for(let keyM of masNameFile)
                    {
                        for(let keyb of postP.blocks)
                        {
                            if(keyb.type == "file")
                            {
                                if(!keyb.data.file)
                                {
                                   keyb.data.file = keyM
                                   break
                                }
                            }
                        }
                    }
                    continue
                }

                if(key == "audio")
                {
                    const masNameAudio = this.fileService.createMultiFile(FileType.AUDIOPOST , files.audio )

                    for( let keyM of masNameAudio )
                    {
                        for(let keyb of postP.blocks)
                        {
                            if(keyb.type == "audio")
                            {
                                if(!keyb.data.file)
                                {
                                   keyb.data.file = keyM
                                   break
                                }
                            }
                        }
                    }
                    continue
                }
            }
            
            const nameFile = await this.fileService.createJsonPost(FileType.JSON, JSON.stringify(postP))
            
            let nameFileImg = "null"

            if(files.imageView)
            {
                nameFileImg = this.fileService.createFile(FileType.IMGTITLE, files.imageView[0])
            }
            
            const newPost = await this.PostModel.create({
                file:nameFile,
                idUser:userId,
                date:Date.now(),
                views:0,
                headers:post.headers,
                paragraph:post.paragraph,
                theme:post.theme,
                imageView:nameFileImg,
                languagePost:post.language,
                viewed:[]
            })

            return newPost._id

        } catch(e){
            console.log(e);
            
            throw new HttpException(e, HttpStatus.BAD_REQUEST)
        }
    }   

    async getPostProfile(req){
        let Posts = await this.PostModel.find({idUser: req.user._doc._id})
        return Posts
    }

    async getPostID(req){
        let Posts = await this.PostModel.find({_id: req.body._id})
        this.view(Posts,req.ip)
        return Posts
    }

    async getPostQery(req){
        let Posts
        
        // console.log([ 
        //     req.body.qery.idUser?{'idUser': req.body.qery.idUser}:{'idUser': {$ne:1}}, 
        //     req.body.qery.date?{'date':{$gt : req.body.qery.date.minDate, $lt: req.body.qery.date.maxDate}}:{'idUser': {$ne:1}},
        //     req.body.qery.theme?{'theme':req.body.qery.theme}:{'idUser': {$ne:1}},
        //     req.body.qery.language?{'languagePost':req.body.qery.language}:{'idUser': {$ne:1}}
        // ]);
        if(req.body.qery.hasOwnProperty("view"))
        {

            return Posts = await this.PostModel.find({
                $and:[ 
                    req.body.qery.idUser?{'idUser': req.body.qery.idUser}:{'idUser': {$ne:1}}, 
                    req.body.qery.date?.minDate&&req.body.qery.date?.maxDate?{'date':{$gt : req.body.qery.date.minDate, $lt: req.body.qery.date.maxDate}}:{'idUser': {$ne:1}},
                    req.body.qery.theme?{'theme':req.body.qery.theme}:{'idUser': {$ne:1}},
                    req.body.qery.language?{'languagePost':req.body.qery.language}:{'idUser': {$ne:1}}
                ]
            }).sort({"view":-1,"date":-1}).clone().limit(req.body.value)

        } else {

            return Posts = await this.PostModel.find({
                $and:[ 
                    req.body.qery.idUser?{'idUser': req.body.qery.idUser}:{'idUser': {$ne:1}}, 
                    req.body.qery.date?.minDate&&req.body.qery.date?.maxDate?{'date':{$gt : req.body.qery.date.minDate, $lt: req.body.qery.date.maxDate}}:{'idUser': {$ne:1}},
                    req.body.qery.theme?{'theme':req.body.qery.theme}:{'idUser': {$ne:1}},
                    req.body.qery.tag?{$text: {$search:req.body.qery.tag}}:{'idUser': {$ne:1}},
                    req.body.qery.language?{'languagePost':req.body.qery.language}:{'idUser': {$ne:1}}
                ]
            }).sort({"date":-1}).clone().limit(req.body.value)
        }       
    }

    async view(posts,reqIp)
    {
        for(let key of posts[0].ipViewed)
        {
            if(key == reqIp)
            {
                return
            }
        }
        posts[0].ipViewed.push(reqIp)
        posts[0].views++
        await posts[0].save()
    }

    async deletePostId(req)
    {
       return this.PostModel.deleteOne({_id : req.body.id})
    }
}
