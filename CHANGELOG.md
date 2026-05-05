## [1.0.0] - 2026-05-05

### Added

* CHANGELOG file
* FullScreen component with fullscreen view support
* TagList component for displaying post tags
* `TagActionsContext` hook to manage state for `TagList`, `TagSelect`, and `FullScreenPost`

### Changed

* Refactored post action buttons into a dedicated `PostActions` module
* Moved search logic into a `SearchContext` hook
* Replaced `useEffect`-based search with a dedicated search function
* Consolidated `TagSelect` and `TagList` into `ClientPost.jsx`

### Updated

* Improved UI for tag display in posts
* Removed all scrollbars from the site 

### Fixed

* Resolved issue where "loading..." was not shown while fetching posts
