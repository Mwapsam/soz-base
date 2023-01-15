import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Card,
  Textarea,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select, 
  Option
} from "@material-tailwind/react";
import { editProduct } from '../../../services/product.service';

const Edit = ({open, handleOpen, prod}) => {
    const [state, setState] = useState(prod);
    const [photos, setPhotos] = useState('');

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
      };

      console.log(state);

      const handleEdit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('product[name]', state.name);
        formData.append('product[description]', state.description);
        formData.append('product[price]', state.price);
        // _.forEach(photos, photo => {
        //     formData.append(`photos[]`, photo)
        // })

        dispatch(editProduct({id: prod.id, product: formData}))
      }

  return (
    <>
        <Fragment>
            <Dialog
                size='lg'
                open={open}
                handler={handleOpen}
                animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogBody divider>
                <form onSubmit={handleEdit} className="grid mt-20 place-items-center w-full">
                    <Typography variant="h5" className="mb-2">
                        Edit Product
                    </Typography>
                    <Card className="lg:w-9/12 sm:w-96">
                        <CardBody className="flex flex-col gap-4">
                        <div className="flex lg:flex-row flex-col gap-4">
                            <Input label="Name" defaultValue={prod && prod.name} onChange={handleChange} name='name'  size="lg" required />
                            <Input type='number' label="Price" defaultValue={prod && prod.price} onChange={handleChange} name='price' size="lg" required />
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
                            multiple accept="image/*" 
                            onChange={(e) => setPhotos(e.target.files)}
                            // value={prod}
                            // required
                            />
                        </label>
                            <div className='lg:w-2/4'>
                            <Select
                                label="Select Currency"
                                animate={{
                                mount: { y: 0 },
                                unmount: { y: 25 },
                                }}
                                value={prod && prod.currency}
                                // onChange={handleChange}
                                required
                            >
                                <Option value='USD'>USD</Option>
                                <Option value='EUR'>EUR</Option>
                                <Option value='GBP'>GBP</Option>
                            </Select>
                            </div>
                        </div>
                        <div>
                            <Textarea label="Description" defaultValue={prod && prod.description} onChange={handleChange} name='description' size="lg" required />
                        </div>
                        </CardBody>
                        <CardFooter className="pt-0">
                        <Button type='submit' color='gray' variant="gradient" fullWidth>
                            Create Product
                        </Button>
                        </CardFooter>
                    </Card>
                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        className="mr-1"
                        onClick={handleOpen}
                    >
                        <span>Cancel</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    </>
  )
}

export default Edit