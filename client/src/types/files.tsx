/*
{
    name: "BOX",
    directories: [
        {
        name: "folder 1",
        directories: [
            {
            name: "folder 3",
            directories: [],
            files: [
                {
                name: "file 1",
                content: "content 1"
                }
            ]
            }
        ],
        files: [
            {
            name: "file 1",
            content: "content 1"
            },
            {
            name: "file 2",
            content: "content 2"
            }
        ]
        },
        {
        name: "folder 2",
        directories: [],
        files: [
            {
            name: "file 1",
            content: "content 1"
            }
        ]
        }
    ],
    files: [
        {
        name: "file 1",
        content: "content 1"
        },
        {
        name: "file 2",
        content: "content 2"
        },
        {
        name: "file 3",
        content: "content 3"
        }
    ]
}
*/

type ElementQuery = {
    name: string,
    type: "file" | "folder"
    path: string
}

type File = {
    name: string
    content: string | undefined
}

type Directory = {
    name: string
    directories: Directory[]
    files: File[]
}

export type {
    ElementQuery,
    File,
    Directory
}