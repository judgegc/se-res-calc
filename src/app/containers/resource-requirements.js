import React from 'react';
import { connect } from 'react-redux';

import { setFilter } from './../actions';

import ResourceRequirements from './../components/resource-requirements';

const calcComponents = (blocks, size) => {
    return blocks.reduce((reqComponents, item) => {
        for (const compName in item.block.components[size]) {
            if (!item.block.components[size].hasOwnProperty(compName)) {
                continue;
            }

            const found = reqComponents.find(comp => comp.name === compName);

            if (found) {
                found.amount += item.block.components[size][compName].amount * item.count;
            } else {
                const c = item.block.components[size][compName];
                reqComponents.push({
                    name: compName,
                    component: {
                        icon: c.component.icon,
                        title: c.component.title
                    },
                    amount: c.amount * item.count
                });
            }
        }
        return reqComponents;
    }, []);
};

const calcMaterials = (blocks, size) => {
    return blocks.reduce((reqMaterials, item) => {
        for (const compName in item.block.components[size]) {
            if (!item.block.components[size].hasOwnProperty(compName)) {
                continue;
            }

            for (const materialName in item.block.components[size][compName].component.components) {
                if (!item.block.components[size][compName].component.components.hasOwnProperty(materialName)) {
                    continue;
                }

                const found = reqMaterials.find(m => m.name === materialName);
                if (found) {
                    found.amount += item.block.components[size][compName].component.components[materialName].amount *
                        item.block.components[size][compName].amount *
                        item.count;
                } else {
                    const m = item.block.components[size][compName].component.components[materialName];
                    reqMaterials.push({
                        name: materialName,
                        component: {
                            icon: m.material.icon,
                            title: m.material.title
                        },
                        amount: m.amount *
                            item.block.components[size][compName].amount *
                            item.count
                    });
                }
            }
        }
        return reqMaterials;
    }, []);
};

const calcOres = (blocks, size) => {
    return blocks.reduce((reqMaterials, item) => {
        for (const compName in item.block.components[size]) {
            if (!item.block.components[size].hasOwnProperty(compName)) {
                continue;
            }

            for (const materialName in item.block.components[size][compName].component.components) {
                if (!item.block.components[size][compName].component.components.hasOwnProperty(materialName)) {
                    continue;
                }

                const found = reqMaterials.find(m => m.name === materialName);
                if (found) {
                    found.amount += item.block.components[size][compName].component.components[materialName].amount *
                        item.block.components[size][compName].amount *
                        item.count /
                        item.block.components[size][compName].component.components[materialName].material.ratio;
                } else {
                    const m = item.block.components[size][compName].component.components[materialName];
                    reqMaterials.push({
                        name: materialName,
                        component: {
                            icon: m.material.ore.icon,
                            title: m.material.ore.title
                        },
                        amount: m.amount *
                            item.block.components[size][compName].amount *
                            item.count /
                            item.block.components[size][compName].component.components[materialName].material.ratio
                    });
                }
            }
        }
        return reqMaterials;
    }, []);
};

export default connect(state => ({
    components: calcComponents(state.projectBlocks, state.projectMode),
    materials: calcMaterials(state.projectBlocks, state.projectMode),
    ores: calcOres(state.projectBlocks, state.projectMode)
}))(ResourceRequirements);