create view view_feed_with_user_rule as
select r.user_id,
       r.rule_id,
       f.feed_id,
       f.summary,
       f.created_at,
       f.image_url
from "TB_ACCESS_RULE_USER" r
         inner join "TB_PHOTO_FEED" f on r.rule_id = f.rule_id;