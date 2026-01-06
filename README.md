# About
This repo is collection of simulations and such.  
Each simulation is independent of one another and has got its own folder. For simplicity only basic html, css and js is used.  


# Langton's Ant
> "*Langton's ant is a two-dimensional Turing machine with a very simple set of rules but complex emergent behavior.*" ~ [Wikipedia](https://en.wikipedia.org/wiki/Langton%27s_ant)


It is proved to be a universal Turing Machine.


# 100 Prisoners Problem
> *The director of a prison offers 100 death row prisoners, who are numbered from 1 to 100, a last chance. A room contains a cupboard with 100 drawers. The director randomly puts one prisoner's number in each closed drawer. The prisoners enter the room, one after another. Each prisoner may open and look into 50 drawers in any order. The drawers are closed again afterwards. If, during this search, every prisoner finds their number in one of the drawers, all prisoners are pardoned. If even one prisoner does not find their number, all prisoners die. Before the first prisoner enters the room, the prisoners may discuss strategy — but may not communicate once the first prisoner enters to look in the drawers. What is the prisoners' best strategy?*  
> ~ Philippe Flajolet and Robert Sedgewick rendition

If every prisoner selects 50 drawers independently and randomly, the probability that single prisoner finds their number is $\frac{1}{2}$. The probability that all the prisoners find their number is $(\frac{1}{2})^{100}$ ~ a dystopian number.  

A clever strategy to improve this dytopian probability from $(\frac{1}{2})^{100}$ to greater than $30\\%$ is as follows:  

1. All drawers are also labelled 1-100.
2. Each prisoner first opens the drawer labelled with their own number.
3. If the drawer they opened contains some other number than their own then open the drawer with that label.
4. Repeat step 3 until either prisoner runs out of 50 chances or finds their number.

Why this strategy works? Check out [this Veritasium video](https://youtu.be/iSNsgj1OCLA?si=PMWVuf2zHERYiIoc).  

Links:
- https://en.wikipedia.org/wiki/100_prisoners_problem


# Monte Carlo Pi Estimation
This showcases Monte Carlo method of Pi estimation.  

**The basic idea**:

1. Inscribe a circle (with radius $r$) within a square.
2. Uniformly scatter a given number of points over the square.
3. Count number of points lying inside the circle.
4. The ratio of points lying inside the circle to total count of scattered points is an estimate of the ratio of the two areas $=\frac{\pi r^2}{(2r)^2} = \frac{\pi}{4}$.
5. We multiply the obtained ratio by 4 to get estimate of $\pi$.
