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
        // document.getElementById(nodeDatum.__rd3t.id + 1)?.classList.toggle('hidden')
        toggleNode();
    }

    return (
        <g>
            <foreignObject x={-47} y={-30} 
            className={` ${nodeDatum.children?.length > 0 ? 'bg-green-200' : 'bg-red-200'} flex justify-center items-center h-[3.2rem] w-24 shadow-lg shadow-green rounded-md`} onClick={handleClick}>

                {/* <Avatar className={`size-10 border-4 ${nodeDatum.children ? 'border-green-500' : 'border-red-500'}`}>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback className={`${nodeDatum.children ? 'bg-green-500' : 'bg-red-500'} text-white`}>CN</AvatarFallback>
                    </Avatar> */}
                <div className='flex flex-col justify-center items-center size-full text-sm font-medium'>
                    <p>{nodeDatum.name}</p>
                    <p className='text-gray-500'>{nodeDatum.phone}</p>
                </div>
            </foreignObject>
        </g>
    )
};

function Referrals() {
    const treeOrientation = 'vertical';
    const nodeSize = { x: 100, y: 200 };
    const [tree, setTree] = useState({});
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const { referrals, user } = useContext(UserContext);


    const readyTreeData = (root) => {
        if (!root) {
            return {};
        }

        // Initialize an object with the current node's name
        const data = {
            name: root.name,
            phone: root.phone,
            children: []
        };

        // Recursively convert the left and right children, if they exist
        if (root?.leftChild) {
            // console.log(referrals)
            const node = referrals.find(elem => elem?._id == root.leftChild)
            data.children.push(readyTreeData(node));
        }
        if (root?.rightChild) {
            const node = referrals.find(elem => elem?._id == root.rightChild)
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

    useEffect(()=>{
        setX(window.innerWidth/2);
        setY(window.innerWidth/16);
    },[])

    // if (!referrals) {
    //     return (
    //         <>Loading...</>
    //     )
    // }

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
                        translate={{ x: x || 0, y: y || 0 }} // Center the tree
                        nodeSize={nodeSize}
                    />
                </div>
            </section>
        </div>
    )
}

export default Referrals
