import {
    loadAdvancedSearchQueryActions,
    loadSearchActions,
    loadSearchAnalyticsActions
} from 'https://static.cloud.coveo.com/atomic/v1/headless/headless.esm.js';

let headlessEngine;
(async () => {
    await customElements.whenDefined('atomic-search-interface');
    const searchInterface = document.querySelector('atomic-search-interface');

    searchInterface.querySelector('.this-year-button').addEventListener('click', filterFor2022);

    // Initialization
    await searchInterface.initialize({
      accessToken: 'xx564559b1-0045-48e1-953c-3addd1ee4457',
      organizationId: 'searchuisamples'
    });
    
    headlessEngine = searchInterface.engine;
    // Trigger a first search
    searchInterface.executeFirstSearch();
})();

function filterFor2022(e) {
    const { executeSearch } = loadSearchActions(headlessEngine);
    const { logStaticFilterDeselect, logStaticFilterSelect } = loadSearchAnalyticsActions(headlessEngine);
    const { updateAdvancedSearchQueries } = loadAdvancedSearchQueryActions(headlessEngine);

    const isActive = e.currentTarget.classList.contains('active');
    const filterExpression = '@year==2022';

    headlessEngine.dispatch(updateAdvancedSearchQueries({
        aq: isActive ? '' : filterExpression
    }));

    // Log the analytics event
    if (isActive) {
        headlessEngine.dispatch(logStaticFilterDeselect({filterName: 'filterFor2022'}));
    } else {
        headlessEngine.dispatch(logStaticFilterSelect({filterName: 'filterFor2022'}));
    }

    e.currentTarget.classList.toggle('active');
    headlessEngine.dispatch(executeSearch(logStaticFilterSelect({filterName: 'filterFor2022'})));
}