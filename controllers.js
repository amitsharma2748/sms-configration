const pool = require('./db')
const {promisify}=require('util');
const query = promisify(pool.query).bind(pool);
// exports.getAllOrgCOnfigurations=async(req,res,next)=>{
//     const data=await query('SELECT COUNT(*) FROM org_configurations');
//     // console.log(data)
//     res.json(data)
// }
exports.getUniqueConfigurationsPoid=async(req,res,next)=>{
  
    const{poid}=req.body;
    if (poid!==''){
        const data=await query(`SELECT DISTINCT POID FROM sms_configurations`);
        const newData=data.map((item)=>item.POID).sort((a,b)=>a-b)
       
        res.json({
            success:true,
            oids:newData})
    }
    else{
        res.json({
            success:false,

        })
    }
  

}
// exports.getUniqueConfigurationsCategory=async(req,res,next)=>{
  
//     const{poid}=req.body;
//     if (poid!==''){
//         const data=await query(`SELECT DISTINCT Category FROM sms_configurations`);
//         const newData=data.map((item)=>item.Category).sort((a,b)=>a-b)
//         res.json({
//             success:true,
//             categories:newData})
//     }
//     else{
//         res.json({
//             success:false,

//         })
//     }
  

// }
// exports.filterConfigurationByOid=async(req,res,next)=>{
  
//     const{oid}=req.body;
//     if(oid===''){
//           res.status(401).json({
//             sucess:false
//         })
//     }
//     const data=await query(`SELECT * FROM org_configurations where oid = ${oid}`);
//     res.json(data)

// }
exports.filterDataByPoid=async(req,res,next)=>{
  
    const{poid}=req.body;
    const data=await query(`SELECT * FROM sms_configurations where poid = ${poid}`);
    res.json(data)

}
 
exports.updateConfigurationTemplate=async(req,res,next)=>{
  
    const{type,temp,id}=req.body;
     const data=await query(`UPDATE sms_configurations SET '${type}'='${temp}' where ID = ${id} `);
     const newData=await query(`SELECT * FROM org_configurations WHERE POID='${poid}' AND OID='${oid}' AND Category='${category}'`)
    res.json({
        success:true,
        newData
    })

}
exports.updateConfigurationsAllCategory=async(req,res,next)=>{
  
    const{category,systemKey}=req.body;
 
     const data=await query(`UPDATE org_configurations SET Category='${category}'  where SystemKey='${systemKey}' `);
     const newData=await query(`SELECT * FROM org_configurations WHERE POID='0'  AND Category='${category}'`)
    res.json({
        success:true,
        newData
    })

}
exports.updateConfigurationsAllDisplayKeyName=async(req,res,next)=>{
  
    const{DisplayKeyName,systemKey,category}=req.body;
    
     const data=await query(`UPDATE org_configurations SET DisplayKeyName='${DisplayKeyName}'  where SystemKey='${systemKey}' `);
     const newData=await query(`SELECT * FROM org_configurations WHERE POID='0'  AND Category='${category}'`)
    res.json({
        success:true,
        newData
    })

}
exports.updateConfigurationsAllHelptext=async(req,res,next)=>{
  
    const{DisplayKeyName,systemKey,category,Helptext}=req.body;
    console.log(Helptext,systemKey)
     const data=await query(`UPDATE org_configurations SET Helptext='${Helptext}'  where SystemKey='${systemKey}' `);
     const newData=await query(`SELECT * FROM org_configurations WHERE POID='0'  AND Category='${category}'`)
    res.json({
        success:true,
        newData
    })

}
exports.updateConfigurationsAllValue=async(req,res,next)=>{
  
    const{value,systemKey,category,poid}=req.body;
    console.log(req.body)
      await query(`UPDATE org_configurations SET Value='${value}'  where SystemKey='${systemKey}' `);
     const newData=await query(`SELECT * FROM org_configurations WHERE POID='${poid}' AND Category='${category}'`)
    res.json({
        success:true,
        newData
    })

}
