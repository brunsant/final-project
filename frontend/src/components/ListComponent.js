// import React from "react"
// // imports related to DND
// import { Droppable, Draggable } from "react-beautiful-dnd"

// const ListComponent = ({ Thoughts, First, Second, Third, Fourth }) => {
//   const getListStyle = (isDraggingOver) => ({
//     background: isDraggingOver ? "darkgray" : "transparent",
//     width: "40%",
//     margin: "auto",
//   })

//   const getItemStyle = (isDragging, draggableStyle) => ({
//     // some basic styles to make the items look a bit nicer
//     userSelect: "none",

//     // change background colour if dragging
//     background: isDragging ? "darkgrey" : "white",
//     color: isDragging ? "pink" : "black",
//     padding: isDragging ? "0%" : "2%",
//     paddingLeft: "2%",
//     margin: "0%",
//     fontSize: "17px",
//     borderBottom: "0.5px solid gray",

//     // styles we need to apply on draggables
//     ...draggableStyle,
//   })
//   console.log("thoughtsss", Thoughts)
//   return (
//     <div style={{ width: "100%", display: "flex" }}>
//       <Droppable droppableId="Thoughts_drop_area">
//         {(provided, snapshot) => (
//           <div
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//             style={getListStyle(snapshot.isDraggingOver)}
//           >
//             <ul
//               style={{
//                 listStyleType: "none",
//                 textAlign: "left",
//                 padding: "0%",
//                 width: "100%",
//               }}
//             >
//               <h6 style={{ paddingLeft: "2%" }}>Team Thoughts</h6>
//               {Thoughts.map((data, index) => (
//                 <Draggable
//                   key={data._id}
//                   draggableId={`${data}${index}`}
//                   index={index}
//                 >
//                   {(provided, snapshot) => (
//                     <li
//                       key={index}
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={getItemStyle(
//                         snapshot.isDragging,
//                         provided.draggableProps.style
//                       )}
//                     >
//                       {data.description}
//                     </li>
//                   )}
//                 </Draggable>
//               ))}
//             </ul>
//             {/* {provided.placeholder} */}
//           </div>
//         )}
//       </Droppable>
//       <Droppable droppableId="First_drop_area">
//         {(provided, snapshot) => (
//           <div
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//             style={getListStyle(snapshot.isDraggingOver)}
//           >
//             <ul
//               style={{
//                 listStyleType: "none",
//                 textAlign: "left",
//                 padding: "0%",
//                 width: "100%",
//               }}
//             >
//               <h6 style={{ paddingLeft: "2%" }}>First Block</h6>
//               {First.map((data, index) => (
//                 <Draggable
//                   key={data._id}
//                   draggableId={`${data}${index}`}
//                   index={index}
//                 >
//                   {(provided, snapshot) => (
//                     <li
//                       key={index}
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={getItemStyle(
//                         snapshot.isDragging,
//                         provided.draggableProps.style
//                       )}
//                     >
//                       {data}
//                     </li>
//                   )}
//                 </Draggable>
//               ))}
//             </ul>
//             {/* {provided.placeholder} */}
//           </div>
//         )}
//       </Droppable>
//       <Droppable droppableId="Second_drop_area">
//         {(provided, snapshot) => (
//           <div
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//             style={getListStyle(snapshot.isDraggingOver)}
//           >
//             <ul
//               style={{
//                 listStyleType: "none",
//                 textAlign: "left",
//                 padding: "0%",
//                 width: "100%",
//               }}
//             >
//               <h6 style={{ paddingLeft: "2%" }}>Second Block</h6>
//               {Second.map((data, index) => (
//                 <Draggable
//                   key={data._id}
//                   draggableId={`${data}${index}`}
//                   index={index}
//                 >
//                   {(provided, snapshot) => (
//                     <li
//                       key={index}
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={getItemStyle(
//                         snapshot.isDragging,
//                         provided.draggableProps.style
//                       )}
//                     >
//                       {data}
//                     </li>
//                   )}
//                 </Draggable>
//               ))}
//             </ul>
//             {/* {provided.placeholder} */}
//           </div>
//         )}
//       </Droppable>
//       <Droppable droppableId="Third_drop_area">
//         {(provided, snapshot) => (
//           <div
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//             style={getListStyle(snapshot.isDraggingOver)}
//           >
//             <ul
//               style={{
//                 listStyleType: "none",
//                 textAlign: "left",
//                 padding: "0%",
//                 width: "100%",
//               }}
//             >
//               <h6 style={{ paddingLeft: "2%" }}>Third Block</h6>
//               {Third.map((data, index) => (
//                 <Draggable
//                   key={data._id}
//                   draggableId={`${data}${index}`}
//                   index={index}
//                 >
//                   {(provided, snapshot) => (
//                     <li
//                       key={index}
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={getItemStyle(
//                         snapshot.isDragging,
//                         provided.draggableProps.style
//                       )}
//                     >
//                       {data}
//                     </li>
//                   )}
//                 </Draggable>
//               ))}
//             </ul>
//             {/* {provided.placeholder} */}
//           </div>
//         )}
//       </Droppable>
//       <Droppable droppableId="Fourth_drop_area">
//         {(provided, snapshot) => (
//           <div
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//             style={getListStyle(snapshot.isDraggingOver)}
//           >
//             <ul
//               style={{
//                 listStyleType: "none",
//                 textAlign: "left",
//                 padding: "0%",
//                 width: "100%",
//               }}
//             >
//               <h6 style={{ paddingLeft: "2%" }}>Fourth Block</h6>
//               {Fourth.map((data, index) => (
//                 <Draggable
//                   key={data._id}
//                   draggableId={`${data}${index}`}
//                   index={index}
//                 >
//                   {(provided, snapshot) => (
//                     <li
//                       key={index}
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={getItemStyle(
//                         snapshot.isDragging,
//                         provided.draggableProps.style
//                       )}
//                     >
//                       {data}
//                     </li>
//                   )}
//                 </Draggable>
//               ))}
//             </ul>
//             {/* {provided.placeholder} */}
//           </div>
//         )}
//       </Droppable>
//     </div>
//   )
// }

// export default ListComponent
