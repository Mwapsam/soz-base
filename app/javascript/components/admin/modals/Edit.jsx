import React, { Fragment } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
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

const Edit = ({open, handleOpen}) => {
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
                <form className="grid mt-20 place-items-center w-full">
                    <Typography variant="h5" className="mb-2">
                        Product Form
                    </Typography>
                    <Card className="lg:w-9/12 sm:w-96">
                        <CardBody className="flex flex-col gap-4">
                        <div className="flex lg:flex-row flex-col gap-4">
                            <Input label="Name" name='name'  size="lg" required />
                            <Input type='number' label="Price" name='price' size="lg" required />
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
                                required
                            >
                                <Option value='USD'>USD</Option>
                                <Option value='EUR'>EUR</Option>
                                <Option value='GBP'>GBP</Option>
                            </Select>
                            </div>
                        </div>
                        <div>
                            <Textarea label="Description" name='description' size="lg" required />
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