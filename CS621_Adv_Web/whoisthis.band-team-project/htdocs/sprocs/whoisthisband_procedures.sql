-- ***************************************************************************************
--                          FILE:  whoisthisband_procedures.sql
--
-- This file provides procedures for whoisthis.band, to be used in the 
-- mysql database.
-- 
-- Authors:  Caleb Farris, Matthew Jackson, David Parsons, Dongho Jeon
-- ***************************************************************************************

-- ************************************GET_VIEWS******************************************
delimiter //
create procedure get_views(IN in_userId int)
begin

select viewId, artistName, popularity, CUDDATE
from views v
where v.userId = in_userId;

end //
delimiter ;

-- CALL get_views(1);
-- **********************************END_GET_VIEWS****************************************

-- **********************************GET_SINGLE_VIEW**************************************
delimiter //
create procedure get_single_view(IN in_viewId int)
begin

select artistName, popularity, CUDDATE
from views v
where v.viewId = in_viewId;

end //
delimiter ;

-- CALL get_single_view(1);
-- *****************************END_GET_SINGLE_VIEWS**************************************

-- **********************************GET_POPULARITY**************************************
delimiter //
create procedure get_popularity(IN in_viewId int)
begin

select popularity, CUDDATE
from views v
where v.viewId = in_viewId;

end //
delimiter ;

-- CALL get_popularity(1);
-- ******************************END_GET_POPULARITY***************************************

-- ************************************GET_TWEETS*****************************************
delimiter //
create procedure get_tweets(IN in_viewId int)
begin

select tweet, screen_name, profile_img, id_str
from tweets t
where t.viewId = in_viewId;

end //
delimiter ;

-- CALL get_tweets(1);
-- **********************************END_GET_TWEETS***************************************

-- ************************************GET_TRACKS*****************************************
delimiter //
create procedure get_tracks(IN in_viewId int)
begin

select track, album, cover_art, preview_url
from tracks t
where t.viewId = in_viewId;

end //
delimiter ;

-- CALL get_tracks(1);
-- **********************************END_GET_TRACKS***************************************

-- ************************************GET_USERPWD****************************************
delimiter //
create procedure get_userPwd(IN login varchar(50))
begin

select  pwd
from users u
where u.login = login;

end //
delimiter ;

-- CALL get_userPwd('Mickey');
-- **********************************END_GET_USERPWD**************************************

-- ************************************CREATE_VIEW****************************************
delimiter //
create procedure create_view( IN in_artistName varchar(100), IN in_popularity char(2), IN in_userId int(11) )
begin

insert into views (artistName, popularity, userId, CUDAction)
    values (in_artistName, in_popularity, in_userId, 1);
select LAST_INSERT_ID();

end //

delimiter ;

-- CALL create_view('Lady Gaga', 'A+', 1); 
-- **********************************END_CREATE_VIEW**************************************

-- ***********************************CREATE_TWEET****************************************
delimiter //
create procedure create_tweet( IN in_tweet varchar(200), IN in_sn varchar(50), IN in_profile varchar(500), IN in_id_str varchar(50), IN in_viewId int )
begin

declare v_tweetId int;
declare v_tweet varchar(200);
declare v_screen_name varchar(50);
declare v_profile_img varchar(500);
declare v_id_str varchar(50);
declare v_viewId int;

select tweetId
into v_tweetId
from tweets t
where t.tweet = in_tweet and t.screen_name = in_sn and t.profile_img = in_profile and t.id_str = in_id_str and t.viewId = in_viewId;

if (v_tweetId is null) then
    insert into tweets (tweet, screen_name, profile_img, id_str, viewId, CUDAction)
        values (in_tweet, in_sn, in_profile, in_id_str, in_viewId, 1);
    set v_tweetId = LAST_INSERT_ID();
end if;

end //

delimiter ;

-- CALL create_tweet('What an awesome band!', 'bob', 'path_to_image', '1111111', 1);
-- *********************************END_CREATE_TWEET**************************************

-- ***********************************CREATE_TRACK****************************************
delimiter //
create procedure create_track( IN in_track varchar(100), IN in_album varchar(100), IN in_cover varchar(500), IN in_preview varchar(500), IN in_viewId int )
begin

declare v_trackId int;
declare v_track varchar(100);
declare v_album varchar(100);
declare v_cover_art varchar(500);
declare v_preview_url varchar(500);
declare v_viewId int;

select trackId
into v_trackId
from tracks t
where t.track = in_track and t.album = in_album and t.cover_art = in_cover and t.preview_url = in_preview and t.viewId = in_viewId;

if (v_trackId is null) then
    insert into tracks (track, album, cover_art, preview_url, viewId, CUDAction)
        values (in_track, in_album, in_cover, in_preview, in_viewId, 1);
    set v_trackId = LAST_INSERT_ID();
end if;

end //

delimiter ;

-- CALL create_track('Snow', 'Stadium Arcadium', 'path_to_cover_art', 'path_to_preview_url', 1);
-- *********************************END_CREATE_TRACK**************************************