import ores from './data/ores.json';
import materials from './data/materials.json';
import components from './data/components.json';
import blocks from './data/blocks.json';

export default () => {
    const lOres = {};
    Object.keys(ores).forEach(name => {
        const ore = ores[name];
        lOres[name] = { ...ore, icon: `${ASSETS_DIR}/ores/${ore.icon}` };
    });

    const lMaterials = {};
    Object.keys(materials).forEach(name => {
        const mat = materials[name];
        const reqOre = lOres[mat.ore];
        if (!reqOre) {
            throw new ReferenceError(`Material '${name}' ore '${mat.ore}' is not defined in 'data/ores.json'.`);
        }
        lMaterials[name] = { ...mat, ore: reqOre, icon: `${ASSETS_DIR}/materials/${mat.icon}` };
    });

    const lComponents = {};
    Object.keys(components).forEach(compName => {
        const comp = components[compName];

        const compComps = {};
        Object.keys(comp.components).forEach(matName => {
            const mat = lMaterials[matName];
            if (!mat) {
                throw new ReferenceError(`'${compName}' component material '${matName}' is not defined in 'data/materials.json'`);
            }
            compComps[matName] = { material: mat, amount: comp.components[matName] };
        });
        lComponents[compName] = { ...comp, components: compComps, icon: `${ASSETS_DIR}/components/${comp.icon}` };
    });

    const lBlocks = {};
    Object.keys(blocks).forEach(blockName => {
        const block = blocks[blockName];

        const blockComps = {};
        if(!block.components) {
            throw new ReferenceError(`'${blockName}' block 'component' property is not defined.`);
        }

        if (block.components.small) {
            blockComps.small = {};
            Object.keys(block.components.small).forEach(compName => {
                const lComponent = lComponents[compName];
                if (!lComponent) {
                    throw new ReferenceError(`'${blockName}' small block component '${compName}' is not defined in 'data/components.json'`);
                }
                blockComps.small[compName] = { component: lComponent, amount: block.components.small[compName] };
            });
        }

        if (block.components.large) {
            blockComps.large = {};
            Object.keys(block.components.large).forEach(compName => {
                const lComponent = lComponents[compName];
                if (!lComponent) {
                    throw new ReferenceError(`'${blockName}' large block component '${compName}' is not defined in 'data/components.json'`);
                }
                blockComps.large[compName] = { component: lComponent, amount: block.components.large[compName] };
            });
        }

        lBlocks[blockName] = { ...block, components: blockComps, icon: `${ASSETS_DIR}/blocks/${block.icon}` };
    });

    return lBlocks;
};