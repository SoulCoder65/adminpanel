import authreducer from "./authreducer"
//business
import businessreducer from "./business/getdatareducer"
import businessdeletereducer from "./business/deletedatareducer"
import businessupdatereducer from "./business/updatedatareducer"

//categories
import getAllCategories from "./business/getcategoryreducer"
import deletecategoryreducer from "./business/deletecategoryreducer"
import updatecategoryreducer from "./business/updatecategoryreducer"
import createcategoryreducer from "./business/createcategoryreducer"
import categorystatsreducer from "./business/categorystatsreducer"

// users
import usersreducer from "./users/getdatareducer"
import userdeletereducer from "./users/deletedatareducer"
import userlistdatareducer from "./users/getuserdatareducer"
import userupdatereducer from "./users/updatedatareducer"
import daywisereducer from "./users/daywisereducer"
import {combineReducers} from "redux"


//admin specific
import businessqueries from "./admin/getbusinessqueryreducer"
import businessupdatequeries from "./admin/updatebusinessqueryreducer"
import getAllSubAdmins from "./getallsubadmins"
import updateSubAdmin from "./updatesubadmins"
import userqueries from "./admin/getuserqueryreducer"
import userupdatequeries from "./admin/updateuserqueryreducer"
import getAllRoles from "./admin/getallrolesreducers"
import createnewrole from "./admin/createrolereducer"
import updateaccess from "./admin/updateaccessreducers"
import getspecificrole from "./admin/getspecificrolereducer"
import updaterole from "./admin/updaterolereducer"
const rootReducer=combineReducers(
    {
        auth:authreducer,
        business:businessreducer,
        businessdelete:businessdeletereducer,
        businessupdate:businessupdatereducer,

        businesscategories:getAllCategories,
        businessdeletecategories:deletecategoryreducer,
        businessupdatecategories:updatecategoryreducer,
        businesscreatecategories:createcategoryreducer,
        businesscategoriesstats:categorystatsreducer,

        users:usersreducer,
        usersData:userlistdatareducer,
        userdelete:userdeletereducer,
        userupdate:userupdatereducer,
        daywiselist:daywisereducer,

        businessqueries:businessqueries,
        businessupdatequeries:businessupdatequeries,

        userqueries:userqueries,
        userupdatequeries:userupdatequeries,

        getAllSubAdmins:getAllSubAdmins,
        updateSubAdmin:updateSubAdmin,

        getAllroles:getAllRoles,
        createnewrole:createnewrole,
        updateaccess:updateaccess,
        getspecificrole:getspecificrole,
        updaterole:updaterole

    }
)
export default rootReducer;