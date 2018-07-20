## Kyle Peacock's Leaderboard Example

This project was an experiment with using test-driven development to create a highly-tested React project over the course of an evening. 

## Requirements

* Application must be written in React.

* The application must support the following main features:
  * Have a form so users can add/edit players. The form must include the following three fields: `firstName:String`, `lastName:String`, `score:Integer[0,100]`
  * Display the leaderboard in a tabular format sorted by `score`, and `lastName` in ASCENDING order. Therefore, if two players have the same `score`, the sorting will fall back to `lastName`
  * The names displayed on the leaderboard should be combined into one field when displaying as such: `lastName, firstName`
  * Have the ability to remove players by clicking a `Delete` button in the leaderboard.

### Sample leaderboard design:

| Name          | Score |        |
| ------------- | ----- | ------ |
| Geary, Alice  | 96    | Delete |
| Junge, John   | 96    | Delete |
| Vera, Rob     | 88    | Delete |

