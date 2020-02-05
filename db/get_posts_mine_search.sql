select p.id, p.title, p.img, p.content, p.author_id, u.username, u.profile_pic from posts p
join users u on u.id = p.author_id
where p.author_id = $1
and p.title like '%'||$2||'%'
or p.content like '%'||$2||'%';