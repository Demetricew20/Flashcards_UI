import http from './axios'

class FlashcardServices {
        getAllCollections() {
        return http.get(" ");
        }

        getCollection(id) {
        return http.get(`collection/${id}`);
        }

        createCollection(data) {
        return http.post(" ", data);
        }

        updateCollection(id, data) {
        return http.put(`collection/${id}`, data);
        }

        deleteCollection(id) {
        return http.delete(`collection/${id}`);
        }

        getAllFlashcards(){
            return http.get(`flashcards`)
        }

        getFlashcards(collectionId, flashcardId) {
        return http.get(`collection/${collectionId}/flashcards/${flashcardId}`);
        }

        createFlashcard(data){
            return http.post(`flashcards`, data)
        }

        updateFlashcard(id, data) {
            return http.put(`flashcards/${id}`, data);
            }

        deleteFlashcard(id, collection) {
            return http.delete(`collection/${collection}/flashcards/${id}`);
            }


}

export default new FlashcardServices();