import fs from 'fs'

const data = fs.readFileSync('data.txt', 'utf-8');
const rows = data.split('\n');

// Create a duplicate array with the first and last row removed as we don't want/need to test.
const rowsToTest = [...rows];
rowsToTest.shift();
rowsToTest.pop();

let visibleTrees = 0;

rowsToTest.forEach((row, rowIndex) => {
    const trees = row.split('');

    trees.forEach((tree, treeIndex) => {
        let isVisibleFromLeft = false;
        let isVisibleFromRight = false;
        let isVisibleFromTop = false;
        let isVisibleFromBottom = false;

        // Test tree visibility from left and right.
        // Skip the first and last trees as we don't need to test these.
        if (treeIndex != 0 && treeIndex != rows.length - 1) {

            // Collect trees to the left and right of the current tree.
            const treesBefore = trees.slice(0, treeIndex);
            const treesAfter = trees.slice(treeIndex + 1);

            // Determine if tree is visible from either left or right direction.
            isVisibleFromLeft = !treesBefore.some(height => height >= tree);
            isVisibleFromRight = !treesAfter.some(height => height >= tree);


            // Test tree visibility from above and below.
            const columns = rows.flatMap(row => {
                const trees = row.split('');
                const tree = trees.splice(treeIndex, 1);
                return tree;
            });

            // Collect trees above and below the current tree.
            const treesAbove = columns.slice(0, rowIndex + 1);
            const treesBelow = columns.slice(rowIndex + 2);

            // Determine if tree is visible from above or below.
            isVisibleFromTop = !treesAbove.some(height => height >= tree);
            isVisibleFromBottom = !treesBelow.some(height => height >= tree);
        }

        if (isVisibleFromLeft || isVisibleFromRight || isVisibleFromTop || isVisibleFromBottom) visibleTrees++
    });
});

visibleTrees += rowsToTest.length * 2
visibleTrees += rows[0].length * 2

console.log(visibleTrees);