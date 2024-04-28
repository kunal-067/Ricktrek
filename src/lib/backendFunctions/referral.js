import {
    User
} from "../models/user";

function generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const codeLength = 12;
    let referralCode = '';
    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        referralCode += characters.charAt(randomIndex);
    }
    return referralCode;
}
export async function generateReferralCode() {
    while (true) {
        const generatedReferralCode = generateRandomCode();
        const existingCode = await User.findOne({
            referralCode: generatedReferralCode
        });

        if (!existingCode) {
            return generatedReferralCode;
        }
    }
}

export async function addTreeData(sponsor, position, userId) {
    try {
        if (position == 'left') {
            if (!sponsor.leftChild) {
                sponsor.leftChild = userId;
                return await sponsor.save();
            }

            const nextChild = await User.findById(sponsor.leftChild)
            return addTreeData(nextChild, position, userId)
        } else {
            if (!sponsor.rightChild) {
                sponsor.rightChild = userId;
                return await sponsor.save();
            }

            const nextChild = await User.findById(sponsor.rightChild)
            return addTreeData(nextChild, position, userId)
        }

    } catch (err) {
        throw new Error(err)
    }
}


export async function getTreeNodes(node) {
    const nodes = [];
    nodes.push(node);
    

    if (node?.leftChild) {
        const leftNode = await User.findById(node.leftChild, {_id:1, name:1, phone:1, rightChild:1, leftChild:1}).exec();
        const leftNodes = await getTreeNodes(leftNode);
        nodes.push(...leftNodes);
    }
    
    if (node?.rightChild) {
        const rightNode = await User.findById(node.rightChild, {_id:1, name:1, phone:1, rightChild:1, leftChild:1}).exec();
        const rightNodes = await getTreeNodes(rightNode);
        nodes.push(...rightNodes);
    }

    return nodes;
}
