const routes = [
  {
    path: '/',
    element: '<LayoutVideo />',
    children: [
      { index: true, element: '<Navigate to="/trending-now" replace />' },
      { path: 'home', element: '<Home />' },
      { path: 'videos/:id', element: '<HomeDetail />' },
      { path: 'contact', element: '<Contact />' },
      { path: 'gn/:genre', element: '<MoreDetail />' },
      { path: 'tags/:tag', element: '<TagsDetail />' },
      { path: 'search/:query', element: '<Search />' },
      { path: 'trending-now', element: '<TradingPage />' },
      { path: 'new-release', element: '<NewRelease />' },
      { path: 'act/:id/:name', element: '<ActressMovies />' },
      { path: 'actresses', element: '<AllActress />' },
      { path: 'all-movies', element: '<AllVideoPage />' },
      { path: 'login', element: '<RouteGuard><Login /></RouteGuard>' },
      { path: 'register', element: '<RouteGuard><Register /></RouteGuard>' },
      { path: 'maintenance', element: '<Maintenance />' },
    ],
  },
  {
    path: '/game',
    element: '<Layout />',
    children: [
      { index: true, element: '<Game />' },
      { path: 'link/:id', element: '<GameLink />' },
    ],
  },
];

export default routes;