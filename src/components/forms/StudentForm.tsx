// StudentForm.tsx - Mobile Optimized
"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long!' })
    .max(20, { message: 'Username must be at most 20 characters long!' }),
  email: z.string().email({message:"Invalid email address!"}),
  password:z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName:z.string().min(1, { message: "Last name is required!" }),
  phone:z.string().min(1, { message: "Phone is required!" }),
  address:z.string().min(1, { message: "Address is required!" }),
  bloodType:z.string().min(1, { message: "Blood Type is required!" }),
  birthday:z.date({ message: "Birthday is required!" }),
  sex: z.enum(["male", "female"], {message:"Sex is required!"}),
  img:z.instanceof(File, {message:"Image is required"}),
});

type Inputs = z.infer<typeof schema>

const StudentForm = ({
        type,
        data,
    }: { 
        type: "create" | "update"; 
        data?: any;
    }) => {

        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm<Inputs>({
            resolver: zodResolver(schema),
        });

        const onSubmit = handleSubmit((data) => {
            console.log(data);
        });

    return (
        <form className="flex flex-col gap-2 sm:gap-6 md:gap-8 p-2 sm:p-0" onSubmit={onSubmit}>
            <h1 className="text-base sm:text-xl font-semibold mb-1 sm:mb-0">Create a new student</h1>
            
            <span className="text-xs text-gray-400 font-medium mb-1 sm:mb-0">
                Authentication Information
            </span>
            
            {/* Authentication Section - Mobile: 2 columns, Tablet+: 2 per row, Desktop: 3 per row */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                <div className="col-span-2 sm:col-span-1">
                    <InputField
                        label="Username" 
                        name="username" 
                        defaultValue={data?.username} 
                        register={register} 
                        error={errors.username}  
                    />
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <InputField
                        label="Email" 
                        name="email"
                        type="email" 
                        defaultValue={data?.email} 
                        register={register} 
                        error={errors.email}  
                    />
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <InputField
                        label="Password" 
                        name="password" 
                        type="password" 
                        defaultValue={data?.password} 
                        register={register} 
                        error={errors.password}  
                    />
                </div>
            </div>
            
            <span className="text-xs text-gray-400 font-medium mb-1 sm:mb-0 mt-2 sm:mt-0">
                Personal Information
            </span>
            
            {/* Personal Information Section - Mobile: 2 columns, responsive for larger screens */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
                <InputField
                    label="First Name"
                    name="firstName"
                    defaultValue={data?.firstName}
                    register={register}
                    error={errors.firstName}
                />
                <InputField
                    label="Last Name"
                    name="lastName"
                    defaultValue={data?.lastName}
                    register={register}
                    error={errors.lastName}
                />
                <InputField
                    label="Phone"
                    name="phone"
                    defaultValue={data?.phone}
                    register={register}
                    error={errors.phone}
                />
                <InputField
                    label="Address"
                    name="address"
                    defaultValue={data?.address}
                    register={register}
                    error={errors.address}
                />
                <InputField
                    label="Blood Type"
                    name="bloodType"
                    defaultValue={data?.bloodType}
                    register={register}
                    error={errors.bloodType}
                />
                <InputField
                    label="Birthday"
                    name="birthday"
                    defaultValue={data?.birthday}
                    register={register}
                    error={errors.birthday}
                    type="date"
                />
                
                {/* Sex Selection */}
                <div className="flex flex-col gap-1 sm:gap-2">
                    <label className="text-xs text-gray-500">Sex</label>
                    <select 
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" 
                        {...register("sex")} 
                        defaultValue={data?.sex}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    {errors.sex?.message && (
                        <p className="text-xs text-red-400">
                            {errors.sex.message.toString()}
                        </p>
                    )}
                </div>
                
                {/* Image Upload - Compact on mobile */}
                <div className="flex flex-col gap-1 sm:gap-2 justify-center">
                    <label
                        className="text-xs text-gray-500 flex items-center gap-1 sm:gap-2 cursor-pointer border-2 border-dashed border-gray-300 rounded-md p-2 sm:p-4 hover:border-gray-400 transition-colors"
                        htmlFor="img"
                    >
                        <Image src="/upload.png" alt="" width={16} height={16} className="sm:w-5 sm:h-5" />
                        <span className="text-center text-xs sm:text-sm">Upload Photo</span>
                    </label>
                    <input type="file" id="img" {...register("img")} className="hidden" />
                    {errors.img?.message && (
                        <p className="text-xs text-red-400">
                            {errors.img.message.toString()}
                        </p>
                    )}
                </div>
            </div>
            
            <button className="bg-blue-400 hover:bg-blue-500 text-white p-2 sm:p-3 rounded-md transition-colors w-full sm:w-auto sm:self-start text-sm sm:text-base mt-2 sm:mt-0">
                {type === "create" ? "Create Student" : "Update Student"}
            </button>
        </form>
    )
}

export default StudentForm;