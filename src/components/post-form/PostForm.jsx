import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  //useForm se hamko different types of properties milega watch continuing watching kise form ko,form ka control le na,value ko set kar na,register ,handlesubmit
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      //note: this control basically as a form pass karonga RTE mey and from RTE we take the control of the form
      defaultValues: {
        //post ko add kar ney ke liya ham default value set kiya with condition if post hey toh
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData); //take the userdata auth sey

  const submit = async (data) => {
    //as data comes it takes time so async function
    if (post) {
      //aagar post hey then we go for update
      //data sey image ka first index ka access ley liya aagar image hey then appwriteservice sey upload karo new image nehi ho toh kuch nehi karo
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        //new image ka file access ley ne ki bath if previous image tha usko delete karo
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        //now for update post slug ka id sey ham specific post ka id ley liya as we defined it appwriteService mey
        //and baki sab data ko object ki undar spread kar lo except featuredImage as we just update image and uska file hey toh id ko database mey store kara lo
        // nehi ho toh undefined rakh do
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      // undefined

      if (dbPost) {
        //aagar dbpost hey toh specific oi post mey navigate kar do
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      //means we dont have anything to update so user gonna create a new form
      //and first upload the file
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        //file hey toh file sey id ley lo
        const fileId = file.$id;
        data.featuredImage = fileId; //featuredImage mey os id ko update kar do
        //after update id createpost mey sob data ko pass kar dea spread sey and here we dont have the access of userdata toh userData j amra useSelector thekey nesi
        //oikhaney userid ko update kar dea
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          //same navigate it specipic post
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };
//basically slug ka url generate krar jonnu its use. say for we give the title of the post content then slug title ko watch karega and uskey hesab sey slug mey
//url generate karega
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")//here callback under value liya and usko typeof sey check kara string ha ki nehi then trim kara menas length
    //then lowercser and then replace ke undar [] undar ^ sign use kiya means isko chor k baki sab mey (-) generate karo
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";//if value nehi hey then empty string return
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {//watch react hooks miltahey with callback here value and name mile ga
      if (name === "title") {//if name title hey then we can our slugTranform method and setValue for slug
        setValue("slug", slugTransform(value.title), { shouldValidate: true });//and shouldValidate ko true kar dea
      }
    });

    return () => subscription.unsubscribe();//here we optimize k liya subcription ko unsubscribe kar dea kiu ki its run again again
  }, [watch, slugTransform, setValue]);//this are dependencies watch ak mehtod hey watch kar ney liya,slugtransform method we just create above


  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        {/* form two part left part 2/3 */}
      <div className="w-2/3 px-2">
        {/* title k liya input field leya */}
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}//requred true 
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}//slug k liya onInput event call kara jo setvalue se value nea nebe
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}//control sey RTE ka value mil ja e ga
        />
      </div>
      {/* write part 1/3 form */}
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}//here image k bina post nehi hoga this are requried
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}//status active or inactive 
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}//requred true 
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
            {/* here condition post hey toh update or nehi toh submit button */}
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
