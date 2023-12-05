import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";


//Its another service for database,file upload,and custom quries ar jonnu
export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client//same as auth.js as class ar mto.when the object create of account then constructor
        //call hbe then we call our client,databases,storage or say bucket call kore desi for avoiding 
        //waste of code ar jonnu
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);//this are needed here databases and storage
        this.bucket = new Storage(this.client);
    }


    //Now here we create the post and we pass those attributes we create in the appwrite 
    //note : name combination of those attributes should be same for as its fucks my life to debugging
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(//this line is appwrite syntactic sugar
                conf.appwriteDatabaseId,//for create post we need databaseid we take it from conf
                conf.appwriteCollectionId,//same as collectionid
                slug,//here we need a unique Id so we can use unique Id method or say here we take the 
                //slug as unique id which user pass us as slug value

                //after this is the object.here we just pass our attribute names those are we create
                //appwrite and pass here as parameterr.
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {//just error showing msg
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }


    //for update is same often. we just get the id of the user and this id we get from slug
    async updatePost(slug, {title, content, featuredImage, status}){
        try {//here we dont need the access of userId bcz whose id he should be update the post
            //this are syntactic sugar
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,

                //and inside object we just take the values we want to update
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }


    //delete korar jonnu we dont need those parameters just take id i mean slug then delete the whole post
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(//here we dont return
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true//we just return here that delete hoa gase..
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false //here we just return that we delete hoy nai
        }
    }


    //here defined to get the specific post just use slug and find the id 
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }


    //here we return all the posts by using qureies
    async getPosts(queries = [Query.equal("status", "active")]){
        //we need only those quries whose status is active
        //note : in quries we have to give index key we have created in appwrite same name
        //without settings indexing we cant use quries..if want we can use multiple indexing in appwrite
        //and then use the query in the basis of indexing 
        try {//syntactic sugar of lists of quries for appwrite doc
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){//here we have to give file as variable not actual file name
        try {//this lines syntactic sugar for upload file
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }


    //delete file method note:here we pass the fileId..where its come from dont be paniked
    //actually upload file method  a async ar vitor we return async function where actually we get fileId
    // as return
    async deleteFile(fileId){
        try {//syntactic sugar
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }


    //File preview method
    //here we dont need to use the async function as response quickly chole aasey. so direct access lay liya
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service()
export default service//here we dont pass the class name as we pass in config.js mey authSercie
//we created the object export the object as we can take the access this object.