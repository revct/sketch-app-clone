DELETE FROM sketchpads WHERE pad_id = $1 
AND uid = $2;

SELECT * FROM sketchpads 
WHERE uid = $2;