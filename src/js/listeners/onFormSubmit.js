import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { instanceApiService } from "../api-service";
import { renderPhotos } from "../render-photos";
import { clearPagePhotos } from "../clear-page-photos";

export async function onFormSubmit (e) {
    e.preventDefault();
  
    const {searchQuery} = e.target.elements;
    const findItem = searchQuery.value.trim()
    if(!findItem) {
      return
    }

    if(instanceApiService.searchValue === findItem) {
      return
    }

    clearPagePhotos();

    instanceApiService.searchValue = findItem;
    instanceApiService.resetPage();
    instanceApiService.resetTotalElementsOnPage();

    console.log('instance после сабміту перед resolve', instanceApiService);

    try {
      const objectResolve = await instanceApiService.fetchPhoto();
      const {totalHits, hits} = objectResolve;
      
      if(hits.length === 0) {
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      }
  
      Notify.success(`Hooray! We found ${totalHits} images.`)
      instanceApiService.totalElements = hits.length;
      
      console.log('instance после сабміту після resolve', instanceApiService);

      renderPhotos(hits, e)
    } catch(error) {
      Notify.failure('Что-то пошло не так');
      console.log(error.message);
    }  
  };
  