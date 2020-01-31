select *, u.username, u.profile_pic from posts
join users u on posts.author_id = u.id