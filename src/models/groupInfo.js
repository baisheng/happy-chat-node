const {
	query
} = require('../utils/db');


// 加入群
let joinGroup = (user_id, group_id) => {
	let _sql = "INSERT INTO group_user_relation(user_id,group_id) VALUES(?,?);"
	return query(_sql, [user_id, group_id])
}

// 查看某个用户是否在某个群中
let isInGroup = (user_id, group_id) => {
	let _sql = "SELECT * FROM group_user_relation WHERE user_id = ? AND group_id = ?;"
	return query(_sql, [user_id, group_id])
}

// 建群
let createGroup = (arr) => {
	let _sql = "INSERT INTO group_info (group_id,group_name,group_notice,group_avator,group_creater,creater_time) VALUES (?,?,?,?,?,?)"
	return query(_sql, arr)
}

// 删除群
let exitGroup = (user_id, group_id) => {
	let _sql = "DELETE FROM  group_user_relation WHERE user_id = ? AND group_id = ? ;"
	return query(_sql, [user_id, group_id])
}

// 获取群列表
let getGroups = function(user_id) {
    const _sql =
        "SELECT gur.group_id , gur.user_id , g.group_name , g.group_notice , g.group_avator, g.group_creater , g.creater_time FROM (select * from group_user_relation order by id desc) as gur  inner join  group_info as g on gur.group_id = g.group_id  WHERE  gur.user_id = ?";
    return query(_sql, [user_id]);
}

module.exports = {
	joinGroup,
	isInGroup,
	createGroup,
	exitGroup,
    getGroups
};
