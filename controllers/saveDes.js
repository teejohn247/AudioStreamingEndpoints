import Details from '../model/Details';


const details = async (req, res) => {

    var id = req.files[0].id;
    
    try{ 
        console.log(req.files)
        const {title, author, date, tags, description} = req.body;
        console.log(title);
        console.log(author);
        console.log(date);
  
  
        let data = await Details.find({ file_id: id.toString()});
  
        data = new Details({
          title : title,
          author: author,
          date: date,
          file_id: id,
          files: req.files,
          tags: tags,
          description:description
        });
        console.log(data);
  
        await data.save();
        res.status(201).json({
            status: 201,
            data: data
          })
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
  }
  
export default details;
  