port module Main exposing (main)

-- import Ports exposing (ImagePortData, fileSelected, fileContentRead)
--import Element exposing (Element, rgb)
--import Element.Background as Background

import Browser
import Html exposing (Html, button, div, input, text)
import Html.Attributes exposing (type_, value, id)
import Html.Events exposing (on)
import Json.Decode as Decode
import Json.Encode exposing (Value)


main : Program () Model Msg
main =
    Browser.document { init = init, update = update, subscriptions = subscriptions, view = view }



-- MODEL


type alias Model =
    { id : String
    , mFile : Maybe File
    }


type alias File =
    { contents : String
    , filename : String
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { id = "FileId", mFile = Nothing }, Cmd.none )



-- UPDATE


type Msg
    = FileSelected
    | FileRead File


port fileSelected : String -> Cmd msg


port fileContentRead : (File -> msg) -> Sub msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FileSelected ->
            ( model
            , fileSelected model.id
            )

        FileRead data ->
            let
                newFile =
                    { contents = data.contents
                    , filename = data.filename
                    }
            in
            ( { model
                | mFile = Just newFile
              }
            , Cmd.none
            )



-- VIEW


view : Model -> Browser.Document Msg
view model =
    { title = "Sizing Web"
    , body =
        [ let
            filePreview =
                case model.mFile of
                    Just i ->
                        viewFilePreview i

                    Nothing ->
                        text ""
          in
          div []
            [ input
                [ type_ "file"
                , id model.id
                , on "change"
                    (Decode.succeed FileSelected)
                ]
                []
            , filePreview
            ]
        ]
    }


viewFilePreview : File -> Html Msg
viewFilePreview file =
    div [] [ text file.filename, text file.contents ]



-- SUBSCRIPTIONS

{-
decodeValue : Value -> Msg
decodeValue x =
    let
        result =
            Decode.decodeValue Decode.string x
    in
    case result of
        Ok file ->
            FileRead file

        Err _ ->
            FileRead { filename = "Failure", contents = "" }
-}

subscriptions : Model -> Sub Msg
subscriptions model =
    fileContentRead FileRead



{-
   view : Model -> Html Msg
   view model =
       Element.layout [] myElement

   myElement : Element msg
   myElement =
       Element.el
           [ Background.gradient { angle=3, steps=[ (rgb 0 0.5 0), (rgb 0.5 0.7 1)]}
           ]
           (Element.text "You've made a styling element")
-}
