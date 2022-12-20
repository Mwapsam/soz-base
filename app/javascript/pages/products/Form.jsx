import React from 'react';
import {
  Card,
  Textarea,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Select, 
  Option
} from "@material-tailwind/react";
 
export default function Form({handleChange, handleSubmit, setPhotos, selectedOption, setSelectedOption, product}) {
  return (
    <form onSubmit={handleSubmit} className="grid mt-20 place-items-center">
      <Typography variant="h5" className="mb-2">
        Product Form
      </Typography>
      <Card className="lg:w-9/12 sm:w-96">
        <CardBody className="flex flex-col gap-4">
          <div className="flex lg:flex-row flex-col gap-4">
            <Input label="Name" onChange={handleChange} name='name' value={product.name}  size="lg" required />
            <Input type='number' label="Price" onChange={handleChange} name='price' value={product.price} size="lg" required />
          </div>
          <div className="flex lg:flex-row flex-col gap-4 lg:items-end">
            <label className="block lg:w-2/4">
            <span className="text-xs">Upload Product images</span>
            <input type="file" className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
              rounded
              border border-solid border-gray-400"
              multiple accept="image/*" onChange={(e) => setPhotos(e.target.files)}
              required
            />
          </label>
            <div className='lg:w-2/4'>
              <Select
                label="Select Currency"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
                onChange={(e) => setSelectedOption(e)} 
                value={selectedOption}
                required
              >
                <Option value='USD'>USD</Option>
                <Option value='EUR'>EUR</Option>
                <Option value='GBP'>GBP</Option>
              </Select>
            </div>
          </div>
          <div>
            <Textarea label="Description" onChange={handleChange} value={product.description} name='description' size="lg" required />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button type='submit' variant="gradient" fullWidth>
            Create Product
          </Button>
        </CardFooter>
      </Card>
    </form>
      
  );
}