
const AddCamps = () => {
  return (
    <div className=''>
    <div className=" shadow-2xl border-emerald-800 rounded-lg p-10 space-y-4 bg-[#D6EDFF]">
  <div className="mb-10"> 
  <h2 className="text-5xl text-black text-center font-bold ">Add <span className="text-green-800">Camps</span></h2>
  </div>
   <form >
   {/* form name and quantity row */}
    <div className="md:flex md:gap-5 mb-8">
    <div className="md:w-1/2">
     <label className="label">
     <span className="label-text text-xl">Camp Name </span>
     </label>
    <label className="flex items-center gap-2">

<input type="text" name="Camp Name" className="input input-bordered w-full " placeholder="Camp Name" />
</label>
    </div>
    <div className="md:w-1/2">
     <label className="label">
     <span className="label-text text-xl">Image</span>
     </label>
    <label className="flex items-center gap-2">

<input type="text" name="Image" className="input input-bordered w-full " placeholder="Image" />
</label>
    </div>
    </div>

    <div className="md:flex md:gap-5 mb-8">
    <div className="md:w-1/2">
     <label className="label">
     <span className="label-text text-xl">Camp Fees </span>
     </label>
    <label className="flex items-center gap-2">

<input type="text" name="Camp Fees" className="input input-bordered w-full " placeholder="Camp Fees" />
</label>
    </div>
    <div className="md:w-1/2">
     <label className="label">
     <span className="label-text text-xl">Location</span>
     </label>
    <label className="flex items-center gap-2">

<input type="text" name="Location" className="input input-bordered w-full " placeholder="Location" />
</label>
    </div>
    </div>

    <div className="md:flex md:gap-5 mb-8">
    <div className="md:w-1/2">
     <label className="label">
     <span className="label-text text-xl">Healthcare Professional Name </span>
     </label>
    <label className="flex items-center gap-2">

<input type="text" name="Healthcare Professional Name" className="input input-bordered w-full " placeholder="Healthcare Professional Name" />
</label>
    </div>
    <div className="md:w-1/2">
     <label className="label">
     <span className="label-text text-xl">Participant count</span>
     </label>
    <label className="flex items-center gap-2">

<input type="text" name="Participant count" className="input input-bordered w-full " placeholder="Participant count" />
</label>
    </div>
    </div>



     {/* form category and details row */}
     
   

    


     {/* form  photo url row */}
   

    

    

    <div className="mb-8">
    <div className="md:w-full">
     <label className="label">
     <span className="label-text text-xl"> Description</span>
     </label>
    <label className="flex items-center gap-2">

{/* <input type="text" name="ShortDescription" className="input input-bordered w-full " placeholder="Short Description" /> */}
<textarea name="Description" id="" cols="70"  rows="5"></textarea>
</label>
    </div>
   
    </div>
    
    
  
   <input type="submit" value="Add Blogs"  className=" py-2 rounded-lg text-2xl font-bold bg-green-800 text-white hover:bg-emerald-900 hover:text-white mt-5 w-full"/>
   

   </form>
 </div>
  </div>
  );
};

export default AddCamps;