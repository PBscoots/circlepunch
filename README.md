## Circle Punch  
This project is a small "optimization" problem. The purpose is to punch holes in a card leaving as little waste as possible. 

The current implementation is a greedy approach that uses some algebaric properties.  

Basically it takes a pattern of 4 circles and sweeps through two angles in predefined steps. It then calculates how many circles could fit the page at each step and stores the configuration with the most circles on the page.  

Future improvements would be to use a more intelligent optimization algorithm as this one starts to struggle at small radii.  

## Software
This interface was created using create-react-app with Material UI for the interface.  

All optimization calculations are done in a webworker for improved UI performance. 

