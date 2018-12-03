const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLID,
    GraphQLList
} = graphql;
const createRetro = require('../models/createRetro');
const { Registration } = require('../models/registrationSchema');
const setretro = require('../models/setretro');
const sendinvite = require('../models/sendinvite');

const user = new GraphQLObjectType({
    name: "user",
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        firstname: { type: new GraphQLNonNull(GraphQLString) },
        lastname: { type: new GraphQLNonNull(GraphQLString) },
        userStatus: { type: new GraphQLNonNull(GraphQLString) }
    })
})

const Email =  new GraphQLObjectType({
    name : "email",
    fields : () => ({
        email: {type : new GraphQLNonNull( GraphQLString)},
        adminstatus : {type : new GraphQLNonNull(GraphQLString)}
    })
})

const setretroobj = new GraphQLObjectType({
    name: "setretro",
    fields: () => ({

        useruid: { type: GraphQLID },
        retroadmin: { type: new GraphQLNonNull(GraphQLString) },
        projectname: { type: new GraphQLNonNull(GraphQLString) },
        roomcode: { type: new GraphQLNonNull(GraphQLString) },
        templatename: { type: new GraphQLNonNull(GraphQLString) },
        shareablelink: { type: new GraphQLNonNull(GraphQLString) },
        retrocategory1: { type: new GraphQLNonNull(GraphQLString) },
        retrocategory2: { type: new GraphQLNonNull(GraphQLString) },
        retrocategory3: { type: new GraphQLNonNull(GraphQLString) },
        retrocategory4: { type: new GraphQLNonNull(GraphQLString) },
        startTime: { type: new GraphQLNonNull(GraphQLString) },
        Endtime: { type: new GraphQLNonNull(GraphQLString) },
        startdate: { type: new GraphQLNonNull(GraphQLString) },
        Enddate: { type: new GraphQLNonNull(GraphQLString) },
        repeatevery: { type: new GraphQLNonNull(GraphQLString) },
        Endson: { type: new GraphQLNonNull(GraphQLString) },
        // Email: {type : new GraphQLList(Email)},
        createdat : {type : new GraphQLNonNull(GraphQLString) }
    })
})


const userSignUp = new GraphQLObjectType({
    name: "userSignUp",
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        firstname: { type: new GraphQLNonNull(GraphQLString) },
        lastname: { type: new GraphQLNonNull(GraphQLString) },
        userStatus: { type: new GraphQLNonNull(GraphQLString) }
    })
})

const addcreateretro = new GraphQLObjectType({
    name: "createretro",
    fields: () => ({
        id: { type: GraphQLID },
        useruid: { type: GraphQLID },
        retroadmin: { type: new GraphQLNonNull(GraphQLString) },
        projectname: { type: new GraphQLNonNull(GraphQLString) },
        sprintnumber: { type: new GraphQLNonNull(GraphQLString) },
        templatename: { type: new GraphQLNonNull(GraphQLString) },
        retrocategory1: { type: new GraphQLNonNull(GraphQLString) },
        retrocategory2: { type: new GraphQLNonNull(GraphQLString) },
        retrocategory3: { type: new GraphQLNonNull(GraphQLString) },
        retrocategory4: { type: new GraphQLNonNull(GraphQLString) }
    })
});

const retrocategories = new GraphQLObjectType({
    name: "retrocategory",
    fields: () => ({

        retroadmin: String,
        retrocategory1: String,
        retrocategory2: String,
        retrocategory3: String,
        retrocategory4: String
    })
})

const findretro = new GraphQLObjectType({
    name: "findretro",
    fields: () => ({
        id: { type: GraphQLID },
        useruid: { type: GraphQLID },
        projectname: { type: new GraphQLNonNull(GraphQLString) },
        sprintnumber: { type: new GraphQLNonNull(GraphQLString) },
        templatename: { type: new GraphQLNonNull(GraphQLString) },
        retrocategory1: { type: new GraphQLNonNull(GraphQLString) },
        retrocategory2: { type: new GraphQLNonNull(GraphQLString) },
        retrocategory3: { type: new GraphQLNonNull(GraphQLString) },
        retrocategory4: { type: new GraphQLNonNull(GraphQLString) }
    })
});


const findroomcode = new GraphQLObjectType({
    name: "findroomcode",
    fields: () => ({
            id : {type : GraphQLID},
            roomcode : { type: new GraphQLNonNull(GraphQLString)}
    })
})

const Rootquery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        findretro: {
            type: addcreateretro,
            args: {
                useruid: { type: GraphQLID }
            },
            resolve(parent, args) {
                return createRetro.findById({ _id: args.useruid });
            }
        },

        signIn: {
            type: user,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: {type : new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {

                return Registration.findOne({ email: args.email })
                    .then(data => {

                        return data
                    }).catch(err => alert(err));
            }
        },

        setretro: {
            type: setretroobj,
            args: {
                inviteuserid: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Registration.findById({ _id: args.inviteuserid })
                    .then(data => {
                        if (data) {
                            return data
                        }
                        else {
                            return new Error("No data found");
                        }
                    }).catch(err => {
                        return err
                    })
            }
        },
        findroomcode : {
            type :findroomcode,
            args :{ 
                roomcode :{ type : GraphQLID}
            },
            resolve(parent ,args){
                return setretro.findOne({roomcode: args.roomcode}).then( data => {
                    if(data){
                        return new Error("This room code is already taken");
                    }
                    
                }).catch( err => {
                    return err
                })
            } 
        } ,

        usertemplate : {
            type :  GraphQLList(addcreateretro),
            args : {
                useruid : {type : GraphQLID },
            },
            resolve(parent,args){
                console.log(args)
                // let arr=[];
                return createRetro.find({useruid : args.useruid}).then(data => {
                    console.log(data)
                    return data
                })
                    // console.log("==========",arr)
                    // return arr
                //     console.log("theen")
                //  console.log(data); 
                                    
                
                .catch( err => {
                    console.log("Catch")
                    return err
                })
            }
        } ,
        countretro:{
            type :  GraphQLList(addcreateretro),
            resolve(parent,args){
                console.log(args);
                return createRetro.find().then(data => {
                    return data
                })
                .catch(err =>{
                    return err
                })
            }
        }


    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {

        createretro: {
            type: addcreateretro,
            args: {
                useruid: { type: GraphQLID },
                retroadmin: { type: new GraphQLNonNull(GraphQLString) },
                projectname: { type: new GraphQLNonNull(GraphQLString) },
                sprintnumber: { type: new GraphQLNonNull(GraphQLString) },
                templatename: { type: new GraphQLNonNull(GraphQLString) },
                retrocategory1: { type: new GraphQLNonNull(GraphQLString) },
                retrocategory2: { type: new GraphQLNonNull(GraphQLString) },
                retrocategory3: { type: new GraphQLNonNull(GraphQLString) },
                retrocategory4: { type: new GraphQLNonNull(GraphQLString) }

            },
            resolve(parent, args) {
                let data = new createRetro({
                    useruid: args.useruid,
                    retroadmin: args.retroadmin,
                    projectname: args.projectname,
                    sprintnumber: args.sprintnumber,
                    templatename: args.templatename,
                    retrocategory1: args.retrocategory1,
                    retrocategory2: args.retrocategory2,
                    retrocategory3: args.retrocategory3,
                    retrocategory4: args.retrocategory4
                })
                return data.save();
            }
        },

        setretro: {
            type: setretroobj,
            args: {

                useruid: { type: GraphQLID },
                retroadmin: { type: new GraphQLNonNull(GraphQLString) },
                projectname: { type: new GraphQLNonNull(GraphQLString) },
                roomcode: { type: new GraphQLNonNull(GraphQLString)},
                templatename: { type: new GraphQLNonNull(GraphQLString) },
                shareablelink: { type: new GraphQLNonNull(GraphQLString) },
                retrocategory1: { type: new GraphQLNonNull(GraphQLString) },
                retrocategory2: { type: new GraphQLNonNull(GraphQLString) },
                retrocategory3: { type: new GraphQLNonNull(GraphQLString) },
                retrocategory4: { type: new GraphQLNonNull(GraphQLString) },
                startTime: { type: new GraphQLNonNull(GraphQLString) },
                Endtime: { type: new GraphQLNonNull(GraphQLString) },
                startdate: { type: new GraphQLNonNull(GraphQLString) },
                Enddate: { type: new GraphQLNonNull(GraphQLString) },
                repeatevery: { type: new GraphQLNonNull(GraphQLString) },
                Endson: { type: new GraphQLNonNull(GraphQLString)},
                adminstatus : {type : new GraphQLNonNull(GraphQLString)},
                // Email:{type: new GraphQLList(Email)},
                createdat : {type : new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let data = new setretro({
                    useruid: args.useruid,
                    retroadmin: args.retroadmin,
                    projectname: args.projectname,
                    roomcode: args.roomcode,
                    templatename: args.templatename,
                    shareablelink: args.shareablelink,
                    retrocategory1: args.retrocategory1,
                    retrocategory2: args.retrocategory2,
                    retrocategory3: args.retrocategory3,
                    retrocategory4: args.retrocategory4,
                    startTime: args.startTime,
                    Endtime: args.Endtime,
                    startdate: args.startdate,
                    Enddate: args.Enddate,
                    repeatevery: args.repeatevery,
                    Endson: args.Endson,
                    // Email : args.Email,
                    createdat : args.createdat

                })
                return data.save();

            }
        },
        signUp: {
            type: userSignUp,
            args: {
                lastname: { type: new GraphQLNonNull(GraphQLString) },
                firstname: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                userStatus: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let data = new Registration({
                    email: args.email,
                    password: args.password,
                    firstname: args.firstname,
                    lastname: args.lastname,
                    userStatus: args.userStatus
                })
                return Registration.findOne({ email: args.email }).then(user => {
                    if (user) {
                        return new Error("This email address is already exist")
                   // return user  
                    }
                    else {
                        return data.save();
                    }
                }).catch((err) => {
                    return err
                })
            }
        },


    }
})

module.exports = new GraphQLSchema({
    query: Rootquery,
    mutation: Mutation
})