select p.id, p.title, p.img, p.content, p.author_id, u.username, u.profile_pic from posts p
join users u on u.id = p.author_id
where p.id = $1