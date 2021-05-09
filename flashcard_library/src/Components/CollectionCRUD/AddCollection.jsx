import React, {useState, useEffect} from 'react';
import FlashcardLibrary from '../../Services/request';

const  AddCollection = (props) => {
    const [collection, setCollection] = useState({
        collection_name: '',
        submitted: false
    });

    useEffect(() => {
        setCollection(collection)
        
    }, [collection])

    const createCollection = () => {
        const data = {
            collection_name: collection.collection_name,
        }
        FlashcardLibrary.createCollection(data)
        .then(data => {
            console.log(data)
            setCollection({
                collection_name: collection.collection_name,
                submitted: true
            })
        })
        .catch(error => {
            console.log(error.response)
        })
        
        newCollection()
    }


    //Detects changes 

    const onChangeName = (event) => {
        
        setCollection({
            ...collection, collection_name: event.target.value
        });
        
    }

    const newCollection = () => {
        setCollection({
            collection_name: '',
            submitted: false
        })
    }

    
        return (
        <div className="submit-form">
            {collection.submitted ? (
            <div>
                <h4> {collection.collection_name} was successfully created!</h4>
                <button className="btn btn-success" onClick={newCollection}>
                Add
                </button>
            </div>
            ) : (
            <div>
                <div className="form-group">
                <label htmlFor="collection_collection_name">Name of Collection</label>
                <input
                    type="text"
                    className="form-control"
                    id="collection_collection_name"
                    required
                    value={collection.collection_name}
                    onChange={onChangeName}
                    collection_name="collection_collection_name"
                />
                </div>
                <button onClick={createCollection} className="btn btn-success">
                Submit
                </button>
            </div>
            )}
        </div>
        );
}

export default AddCollection
