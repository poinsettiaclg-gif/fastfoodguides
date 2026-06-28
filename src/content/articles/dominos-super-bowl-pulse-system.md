---
title: "Surviving Super Bowl Sunday: Inside the Domino's Pulse POS System"
description: "How does Domino's handle the highest-volume pizza day of the year? An insider look at the Pulse POS, makeline routing, and algorithmic dispatching."
pubDate: "2026-06-26"
author: "Russell Roseberry"
authorTitle: "Former Multi-Unit Kitchen Manager"
chain: "Domino's"
topic: "Operations"
relatedArticles:
  - "dominos-dough-stretching"
  - "dominos-oven-tender-role"
  - "dominos-20-bank-rule"
faq:
  - question: "What is the Domino's Pulse system?"
    answer: "Pulse is the proprietary Point of Sale and store management system used by Domino's globally. It handles everything from order intake and online synchronization to makeline routing, driver dispatching, and inventory management."
  - question: "How does Domino's handle Super Bowl Sunday?"
    answer: "Stores prepare by massively over-prepping dough and cheese days in advance. During the rush, the Pulse system balances order flow across multiple makeline screens, allowing several teams of insiders to stretch and top pizzas simultaneously before feeding them into the continuous-belt ovens."
  - question: "What does it mean to 'bump' an order at Domino's?"
    answer: "To 'bump' an order means to clear it from a digital screen once a specific stage of preparation is complete. The makeline bumps an order when it goes into the oven, and the oven tender bumps it when it is boxed, sending it to the dispatch screen."
---

If you work in the pizza industry, you don't care about the Super Bowl. You don't care who is playing, you don't care about the commercials, and you definitely don't care about the halftime show. You only care about the clock. 

Super Bowl Sunday is the highest-volume pizza delivery day of the year in the United States. For a high-volume Domino's store, the hours between 4:00 PM and kickoff are an absolute gauntlet. The store will do a normal Friday night's entire sales volume in the span of about two hours. 

You cannot survive that kind of volume with a good attitude and elbow grease. You survive it through ruthless algorithmic efficiency. 

> **Russell's Note:** The worst thing that can happen on Super Bowl Sunday isn't running out of pepperoni. It's the internet going down. If the system goes offline and you have to switch to analog tickets during the rush, the store is effectively dead. 

At the core of this efficiency is **Pulse**, the proprietary Point of Sale (POS) and store management system that acts as the central nervous system for every Domino's in the world. In this guide, we are going to break down exactly how the Pulse system routes orders, balances the makeline, and dispatches drivers to keep the store from burning to the ground during the Super Bowl rush.

## The Brain of the Operation: The Pulse System

Domino's isn't just a pizza company; it is a tech company that happens to sell pizza. Pulse is the software architecture that makes the vaunted Domino's Pizza Tracker possible, but its real magic happens on the backend in the kitchen.

When an order comes in—whether it's from the app, the website, a phone call, or a walk-in—it is immediately ingested by Pulse and fed into the production queue. Pulse doesn't just print a ticket; it calculates the current load on the ovens, the number of drivers currently on the road, and the average make-time of the insiders (the crew working the makeline). 

Based on this calculus, Pulse dictates the flow of the entire kitchen.

## Makeline Routing and Load Balancing

In a standard, low-volume store, there is one makeline with one digital screen hanging above it. An insider stretches the dough, sauces it, tops it, and slides it into the oven.

On Super Bowl Sunday, that single-lane approach would collapse in ten minutes. 

High-volume stores are equipped with dual makelines (and sometimes a secondary wing/side-item station). Pulse automatically performs **load balancing** across these stations. 
If an order comes in for four large pepperoni pizzas, Pulse will route it to Makeline A. If the next order is for three specialty pizzas, Pulse calculates that Makeline A is currently bogged down with the pepperonis and instantly routes the specialty pizzas to the screen on Makeline B. 

This routing ensures that the physical bottleneck of human hands is mitigated. You have six people stretching dough and topping pizzas simultaneously, all being fed a steady, optimized stream of orders by the Pulse algorithm.

### The Art of the "Bump"

To keep the system moving, Domino's relies on the "bump" mechanic. The digital screens above the makeline display the orders in a grid. Once an insider finishes topping a pizza and slides it onto the conveyor belt of the oven, they press a button on a bump bar (a ruggedized metal keyboard) to clear that pizza from the screen.

When a pizza is bumped from the makeline, several things happen in the Pulse ecosystem:
1. The customer's Pizza Tracker updates from "Prep" to "Bake."
2. The order is transferred to the **Oven Tender's screen** at the end of the oven.
3. The system calculates the exact transit time of the conveyor belt (usually around 6 to 7 minutes) and begins anticipating when that pizza will emerge.

> **Russell's Note:** A cardinal sin in a Domino's kitchen is "false bumping." When the screen turns red (meaning the order is taking too long), panicked managers will sometimes bump the order off the screen *before* it actually goes in the oven to artificially lower their load times for corporate metrics. This causes a massive chain reaction of chaos at the oven and dispatch stations. 

## The Oven Tender: The Most Stressful Job in the Building

The [Oven Tender](/articles/dominos-oven-tender-role) is the hardest job in a Domino's store during a rush. They stand at the end of a massive, multi-tiered gas conveyor oven that operates at roughly 475°F. 

During the Super Bowl rush, a wall of molten cheese and bubbling crust emerges from that oven continuously. If the Oven Tender falls behind, the pizzas will literally fall off the end of the conveyor belt and crash onto the floor. 

The Pulse system aids the Oven Tender via a dedicated screen. As pizzas emerge, the screen tells the tender exactly what is coming out, what box it goes into, and what side items (like garlic dipping sauce) belong with it. Once the order is boxed, the Oven Tender hits their own bump bar.

This final bump:
1. Updates the customer's Tracker to "Quality Check."
2. Sends the order to the Dispatch screen for the drivers.

## Algorithmic Dispatching and the 20-Bank Rule

Once the food is boxed and sitting under the heat lamps, it is at the mercy of the dispatch system. 

During the Super Bowl, a store might have twenty or more delivery drivers on shift. You cannot have drivers randomly grabbing boxes and leaving; it would result in catastrophic routing inefficiencies. 

Pulse handles the dispatching algorithmically. It looks at the physical addresses of the orders currently waiting under the heat lamps and groups them into logical delivery routes. It tells Driver A to take orders 1 and 3 because they are on the same street, and tells Driver B to take order 2 because it's in the opposite direction.

### The Driver Login and the Bank

When a driver returns from a delivery, they log back into the Pulse system. The system knows exactly who is in the store and who is on the road. 

Drivers are also strictly governed by the [20-Bank Rule](/articles/dominos-20-bank-rule). No driver is allowed to carry more than $20 in change (usually a ten, a five, and five ones). During the Super Bowl, when cash tips are flowing, drivers are constantly dropping their excess cash into a computerized smart safe integrated with Pulse. This ensures that if a driver is robbed, the absolute maximum the thief will get is twenty dollars.

## The Reality of the Rush: In the Weeds

Despite the algorithmic perfection of Pulse, the physical reality of a kitchen can still break down. 

The Super Bowl rush tests the absolute physical limits of the equipment and the crew. A continuous-belt oven can only cook so many pizzas per hour. If the makeline is too fast, the oven backs up, and insiders have to hold raw pizzas on racks until there is space on the belt. 

Furthermore, you are dealing with finite physical space in the walk-in cooler. A store preparing for the Super Bowl will have stacks of dough trays piled higher than a person, completely filling the cooler. If the shift manager didn't proof the dough correctly (pulling it from the cooler to let it rise to room temperature), the insiders will be stretching cold, stiff dough, slowing the entire makeline down and completely breaking the Pulse system's load-balancing math.

## The Bottom Line

Surviving Super Bowl Sunday at Domino's requires a bizarre mix of blue-collar grit and Silicon Valley logistics. 

When you track your pizza on the app and watch the status bar slide from "Prep" to "Bake" to "Out for Delivery," you aren't just looking at a cute graphic. You are watching the heartbeat of the Pulse system as it algorithmically routes hundreds of pounds of cheese, dough, and sauce through a high-temperature gauntlet, keeping the chaos just barely contained until the final whistle blows.
