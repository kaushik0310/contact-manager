const asyncHandler = require("express-async-handler");
const Contact=  require("../models/contactModel");
//@desc get all contacts
//@route GET/api/contacts
//@access private

const getContacts =asyncHandler( async(req,res)=>{ 
    const contacts =await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts)
    //res.status(200).json({message: "get all contacts"})
}); 

//@desc create contacts
//@route POST/api/contacts
//@access private

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
        user_id: req.user.id
    })
    res.status(200).json(contact)
    //res.status(200).json({message: "create contact"})
})

//@desc get a contact
//@route GET/api/contacts/:id
//@access private

const getContact =asyncHandler ( async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("contact not found")
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("user dont have permission to update other user request");
    }
    res.status(200).json(contact)
    //res.status(200).json({message: `get contact for id ${req.params.id}` })
})

//@desc update contact
//@route PUT/api/contacts
//@access private

const updateContact =asyncHandler( async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("contact not found")
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("user dont have permission to update other user request");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true});
    res.status(200).json(updatedContact)
    //res.status(200).json({message:  `update contact for id ${req.params.id}` })
})

//@desc delete contact
//@route DELETE/api/contacts
//@access private

const deleteContact =asyncHandler( async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("contact not found")
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("user dont have permission to update other user request");
    }
    const deletedContact = await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedContact)
    //res.status(200).json({message: `delete contact for id ${req.params.id}` })
})

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};