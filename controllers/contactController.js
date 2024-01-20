const asyncHandler = require("express-async-handler");
const Contact=  require("../models/contactModel");
//@desc get all contacts
//@route GET/api/contacts
//@access public

const getContacts =asyncHandler( async(req,res)=>{ 
    const contacts =await Contact.find();
    res.status(200).json(contacts)
    //res.status(200).json({message: "get all contacts"})
}); 

//@desc create contacts
//@route POST/api/contacts
//@access public

const createContact =asyncHandler( async(req,res)=>{
    console.log("the request body is :",req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
    })
    res.status(200).json(contact)
    //res.status(200).json({message: "create contact"})
})

//@desc get a contact
//@route GET/api/contacts/:id
//@access public

const getContact =asyncHandler ( async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("contact not found")
    }
    res.status(200).json(contact)
    //res.status(200).json({message: `get contact for id ${req.params.id}` })
})

//@desc update contact
//@route PUT/api/contacts
//@access public

const updateContact =asyncHandler( async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("contact not found")
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new: true});
    res.status(200).json(updatedContact)
    //res.status(200).json({message:  `update contact for id ${req.params.id}` })
})

//@desc delete contact
//@route DELETE/api/contacts
//@access public

const deleteContact =asyncHandler( async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("contact not found")
    }
    const deletedContact = await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedContact)
    //res.status(200).json({message: `delete contact for id ${req.params.id}` })
})

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};