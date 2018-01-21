import re
import json
import xml.etree.ElementTree as ET

SOURCE = 'CubeBlocks.sbc'

def extract_block(el):
    componentMap = {
        'SteelPlate': 'steel_plate',
        'Construction': 'construction_component',
        'PowerCell': 'power_cell',
        'Computer': 'computer',
        'MetalGrid': 'metal_grid',
        'BulletproofGlass': 'bulletproof_glass',
        'LargeTube': 'large_steel_tube',
        'Girder': 'girder',
        'SmallTube': 'small_steel_tube',
        'InteriorPlate': 'interior_plate',
        'Reactor': 'reactor_components',
        'Display': 'display',
        'Explosives': 'explosives',
        'Medical': 'medical_components',
        'Detector': 'detector_components',
        'GravityGenerator': 'gravity_generator_components',
        'Motor': 'motor',
        'RadioCommunication': 'radio-communication_components',
        'Superconductor': 'superconductor_component',
        'Thrust': 'thruster_components',
        'SolarCell': 'solar_cell'}
    display_name = el.find('DisplayName').text
    if not display_name.startswith('DisplayName_Block'):
        return {}
    words = re.findall('[A-Z][^A-Z]*', display_name.replace('DisplayName_Block_', ''))
    compoents = {}
    for component in el.findall('Components/Component'):
        if componentMap[component.attrib['Subtype']] in compoents:
            compoents[componentMap[component.attrib['Subtype']]] += int(component.attrib['Count'])
        else:
            compoents[componentMap[component.attrib['Subtype']]] = int(component.attrib['Count'])
    return {'name': '_'.join(words).lower(), 'title': ' '.join(words).capitalize(), 'size': el.find('CubeSize').text.lower(), 'components': compoents}


def main():
    root = ET.parse(SOURCE).getroot()
    blocks = []
    for el in root.find('.//CubeBlocks'):
        block = extract_block(el)
        if block:
            blocks.append(block)
    print('Total blocks: {0}'.format(len(blocks)))
    blocksObj = {}
    for block in blocks:
        if block['name'] in blocksObj:
            continue
        combinedBlock = {'title': block['title'], 'components': {block['size']: block['components']}}
        for b in blocks:
            if block is b:
                continue
            if block['name'] == b['name']:
                combinedBlock['components'][b['size']] = b['components']
        blocksObj[block['name']] = combinedBlock
        blocksObj[block['name']]['icon'] = '{0}.png'.format(block['name'])
    
    with open('blocks.json', 'w') as f:
        json.dump(blocksObj, f)

if __name__ == "__main__":
    main()
