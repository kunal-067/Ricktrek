'use client'
import React, { useContext, useEffect, useState } from 'react'
import Tree from 'react-d3-tree';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserContext } from '@/app/context/Context';


const data = {
    name: 'A',
    children: [
        {
            name: 'B',
            children: [
                {
                    name: 'D',
                    children: [
                        {
                            name: 'D1',
                            children: [
                                {
                                    name: 'D12',
                                    children: [
                                        {
                                            name: 'D'
                                        },
                                        {
                                            name: 'E'
                                        }
                                    ]
                                },
                                {
                                    name: 'E',
                                    children: [
                                        {
                                            name: 'D'
                                        },
                                        {
                                            name: 'E',
                                            children: [
                                                {
                                                    name: 'D'
                                                },
                                                {
                                                    name: 'E'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'D1'
                        }
                    ]
                },
                {
                    name: 'E'
                }
            ]
        },
        {
            name: 'C',
            children: [
                {
                    name: 'C1'
                },
                {
                    name: 'C2'
                }
            ]
        }
    ]
}



const renderCustomNode = ({ nodeDatum, toggleNode, foreignObjectProps }) => {
    const handleClick = (e) => {
        document.getElementById(nodeDatum.__rd3t.id + 1)?.classList.toggle('hidden')
        toggleNode();
    }

    return (
        <g>
            <foreignObject x={-25} y={-25} className={`size-14 ${nodeDatum.children && 'h-[4.3rem]'}`} onClick={handleClick}>
                <div style={{ textAlign: 'center' }} className='flex flex-col justify-center items-center'>
                    <Avatar className={`size-14 border-4 ${nodeDatum.children ? 'border-green-500' : 'border-red-500'}`}>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback className={`${nodeDatum.children ? 'bg-green-500' : 'bg-red-500'} text-white`}>CN</AvatarFallback>
                    </Avatar>

                    {/* <div id={nodeDatum.__rd3t.id+1} className='size-5 flex justify-center'>
                        <ArrowDown />
                    </div> */}
                </div>
            </foreignObject>
        </g>
    )
};

function Referrals() {
    const treeOrientation = 'vertical';
    const nodeSize = { x: 100, y: 200 };
    const [tree, setTree] = useState({});

    const { referrals, user } = useContext(UserContext);


    const readyTreeData = (root) => {
        if (!root) {
            return {};
        }

        // Initialize an object with the current node's name
        const data = {
            name: root.name,
            children: []
        };

        // Recursively convert the left and right children, if they exist
        if (root.leftChild) {
            // console.log(referrals)
            const node = referrals.find(elem=>elem._id == root.leftChild)
            data.children.push(readyTreeData(node));
        }
        if (root.rightChild) {
            const node = referrals.find(elem=>elem._id == root.rightChild)
            data.children.push(readyTreeData(node));
        }

        return data;
    }

    useEffect(() => {
        if (referrals) {
            const treeData = readyTreeData(user);
            setTree(treeData)
            console.log(treeData)
        }
    }, [referrals, user])

    if (!referrals) {
        return (
            <>Loading...</>
        )
    }

    return (
        <div className='mx-4'>
            <div className='py-[1rem] bg-[#fff] -mt-10 pl-4 rounded-sm shadow-md'>
                Referrals
            </div>

            <section className='mt-2 flex flex-wrap '>
                <div id="treeWrapper" style={{ width: '100%', height: '100vh' }}>
                    <Tree
                        data={tree}
                        orientation={treeOrientation}
                        renderCustomNodeElement={renderCustomNode}
                        translate={{ x: window.innerWidth / 2, y: window.innerHeight / 16 }} // Center the tree
                        nodeSize={nodeSize}
                    />
                </div>
            </section>
        </div>
    )
}

export default Referrals
