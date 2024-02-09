import { FC, PropsWithChildren, useState } from 'react';
import  data from '../data/data.json'

function New(props: PropsWithChildren) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
};

function Popular(props: PropsWithChildren) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
};

type TypeNew = {
    type: string
    url?: string
    title?: string
    views: number
}

function Article(props: TypeNew) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
};

function Video(props: TypeNew) {
    return (
        <div className="item item-video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
};

const WithHowManyViews = (Component: FC<TypeNew>) => {
    return (props: TypeNew) => {
        if (props.views < 100) {
            return (
                <New>
                    <Component {...props}/>
                </New>
            )
        } 
        else if (props.views > 1000) {
            return (
                <Popular>
                    <Component {...props}/>
                </Popular>
            )
        }
        else {
            return <Component {...props}/>
        }
    }
}

const WithNewVideo = WithHowManyViews(Video)
const WithNewArticle = WithHowManyViews(Article)

type TypeList = {
    list: TypeNew[]
}

function List(props: TypeList) {
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                return (
                    <WithNewVideo {...item} />
                );

            case 'article':
                return (
                    <WithNewArticle {...item} />
                );
        }
    });
};

export default function Hoc() {
    const [list, _setList] = useState(data);

    return (
        <List list={list} />
    );
}