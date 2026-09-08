import 'dotenv/config';

const token = process.env.FIGMA_ACCESS_TOKEN;
const fileKey = process.env.FIGMA_FILE_KEY;

const response = await fetch(
    `https://api.figma.com/v1/files/${fileKey}`,
    {
        headers: {
            'X-Figma-Token': token,
        },
    }
);

const data = await response.json();

// const mainFrame = data.document.children[0].children[0];
//
// console.log({
//     id: mainFrame.id,
//     name: mainFrame.name,
//     type: mainFrame.type,
//     width: mainFrame.absoluteBoundingBox?.width,
//     height: mainFrame.absoluteBoundingBox?.height,
//     fills: mainFrame.fills,
//     strokes: mainFrame.strokes,
// });

console.log(data);

// console.log(JSON.stringify(data, null, 2));

// console.log(
//     JSON.stringify(data.document.children[0].children, null, 2)
// );

// Print Figma layer tree
function printLayers(node, level = 0) {
    console.log(
        `${'  '.repeat(level)}- ${node.name} [${node.type}]`
    );

    if (node.children) {
        for (const child of node.children) {
            printLayers(child, level + 1);
        }
    }
}

// printLayers(data.document);

// const mainFrame = data.document.children[0].children[0];
//
// console.log(JSON.stringify(mainFrame, null, 2));