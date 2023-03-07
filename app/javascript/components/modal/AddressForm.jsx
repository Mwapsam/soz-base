import React, { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {AddressElement} from '@stripe/react-stripe-js';

const AddressForm = ({handleOpen, open, setState}) => {
  return (
        <Fragment>
            <Dialog open={open} handler={handleOpen} className="overflow-scroll h-3/4" size={"xl"}>
                <DialogHeader>Shipping Information</DialogHeader>
                <div className="p-10">
                    <AddressElement 
                        options={
                            {mode: 'shipping',
                            blockPoBox: true,
                            fields: {
                            phone: 'always',
                            },
                            validation: {
                            phone: {
                                required: 'always',
                            }}
                        }}
                        onChange={(event) => {
                            if (event.complete) {
                              const address = event.value.address;
                              console.log(address);
                              setState(address)
                            }}}
                    />
                </div>
                <DialogFooter>
                    <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                    >
                    <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                    <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
  );
};

export default AddressForm;