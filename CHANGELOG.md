5/1 

Daniel (Tailwind)

- src/components/AddChore.jsx
    - Previously had a duplicate that was also present in DayCard.jsx:
        - <h3>Add New Chore for {day.toUpperCase()}</h3>
        - removed duplicate on AddChore.jsx
    - Added className on entire form to add vertical spacing between all child elements
    - Created a container for the buttons, so they can easily be arranged side to side
        - made the two buttons the same size
