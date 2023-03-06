import React, { useState, FC } from "react";
import cn from "classnames";
import styles from "./CreateSong.module.sass";
import {Dropdown} from "../../modules/dropdown";
import {Icon} from "../../modules/icon";
import {TextInput} from "../../modules/textInput";
import {TextArea} from "../../modules/textArea";
// import {Loader} from "../../modules/loader";
// import {Modal} from "../../modules/modal";
import {Preview} from "../../modules/preview";
// import {FollowSteps} from "../../modules/followSteps";
import { SelectOption, TRoyaltiesMap } from "./types";
// import { deployEncrypted } from "../../../../utils/lighthouse/upload";
import { storeMetadata, storeSongThumbnail } from "../../../../utils/web3Storage/store";

const genresOptions = ["Classical", "Country", "Dance & EDM", "Hip-hop & Rap", "Pop", "R&B & Soul"];
const dayOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
const monthOptions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const yearOptions = ["2023", "2024", "2025"];

const getDayOptions = (month: string) => {
    // Get the day options as above, but only for the days in the selected month
    if (month === "February") {
        return dayOptions.slice(0, 28);
    } else if (["April", "June", "September", "November"].includes(month)) {
        return dayOptions.slice(0, 30);
    }
    return dayOptions;
}

const UploadDatasetDetails:FC = () => {
  const [genres, setGenres] = useState<string>(genresOptions[0]);
  const [songName, setSongName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [visibleModal, setVisibleModal] = useState(false);
  const [visiblePreview, setVisiblePreview] = useState(false);

  const [mintPrice, setMintPrice] = useState<string>("");
  
  // Used in lighthouse upload
  const [dataUrl, setDataUrl] = useState<string>("");
  const [songSize, setSongSize] = useState<number>();
  const [fileName, setFileName] = useState<string>("");

  // Used in web3 storage metadata upload
  const [metadataUrl, setMetadataUrl] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  // Used to set the available day after that the consumers can share
  const [month, setMonth] = useState<string>(monthOptions[0]);
  const [day, setDay] = useState<string>(getDayOptions(month)[0]);
  const [year, setYear] = useState<string>(yearOptions[0]);

  const handleDatasetUploaded = async (e: any) => {
    // const res = await deployEncrypted(e);
    // console.log(res); 
    // const { DataUrl, Size, Name } = res;
    // setDataUrl(DataUrl);
    // setDataSize(Size);
    // setFileName(Name);
  }

  const handleThumbnailUploaded = async (e: any) => {
    const songThumbnailUrl = await storeSongThumbnail(e);
    console.log('Store dataset thumbnail with url', songThumbnailUrl);
    if (songThumbnailUrl) {
      setThumbnailUrl(songThumbnailUrl);
    }
  }
  
  const handleCreateItem = async () => {
    setVisibleModal(true);
    if (songSize) {
    //   const metadataUrl = await storeMetadata(
    //     dataName, 
    //     dataContext, 
    //     dataContains, 
    //     sources, 
    //     tags,
    //     thumbnailUrl,
    //     fileName,
    //     dataSize
    //   );
    //   console.log('Store metadata with url', metadataUrl);
    //   if (metadataUrl) {
    //     setMetadataUrl(metadataUrl);
    //   }
    }
  }

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrapper}>
            <div className={styles.head}>
              <div className={cn("h2", styles.title)}>
                Create a new song
              </div>
            </div>
            <form className={styles.form} action="">
              <div className={styles.list}>
                <div className={styles.item}>
                  <div className={styles.category}>Upload file</div>
                  <div className={styles.note}>
                    Drag or choose your file to upload
                  </div>
                  <div className={styles.file}>
                    <input 
                      onChange={async (e) => { 
                        // await handleDatasetUploaded(e);
                      }}
                      className={styles.load} 
                      type="file" 
                    />
                    <div className={styles.icon}>
                      <Icon name="upload-file" size="24" />
                    </div>
                    <div className={styles.format}>
                      MP3 Max 1Gb.
                    </div>
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.category}>Add a song thumbnail</div>
                  <div className={styles.note}>
                    Drag or choose your file to upload
                  </div>
                  <div className={styles.file}>
                    <input 
                      onChange={async (e: any) => { 
                        await handleThumbnailUploaded(e);
                      }}
                      className={styles.load} 
                      type="file" 
                    />
                    <div className={styles.icon}>
                      <Icon name="upload-file" size="24" />
                    </div>
                    <div className={styles.format}>
                      PNG, JPEG
                    </div>
                  </div>
                </div>

                <div className={styles.item}>
                  <div className={styles.category}>Song Details</div>
                  <div className={styles.fieldset}>
                    <TextInput
                      className={styles.field}
                      label="Song name"
                      name="Item"
                      type="text"
                      placeholder='e. g. My New Cool Song"'
                      required
                      value={songName}
                      onChange={(e: any) => setSongName(e.target.value)}
                    />
                    <TextArea
                      className={styles.field}
                      label="Description"
                      name="Description"
                      type="text"
                      placeholder="e. g. Description of your new song"
                      required
                      value={description}
                      onChange={(e: any) => setDescription(e.target.value)}
                    />
                                          
                    <div className={styles.row}>
                      <div className={styles.col}>
                        <div className={styles.field}>
                          <div className={styles.label}>Genre</div>
                          <Dropdown
                            className={styles.dropdown}
                            value={genres}
                            setValue={setGenres}
                            options={genresOptions}
                          />
                        </div>
                      </div>
                      <div className={styles.col}>
                        <TextInput
                          className={styles.field}
                          label="Mint Price"
                          name="Mint Price"
                          type="text"
                          placeholder="e.g. 0.001 FTM"
                          required
                          value={mintPrice}
                          onChange={(e: any) => setMintPrice(e.target.value)}
                        />
                      </div>
                    </div>
                         
                  </div>
                </div>

                <div className={styles.item}>
                    <div className={styles.category}>Available day for public</div>
                    <div className={styles.fieldset}>
                        <div className={styles.row}>
                            <div className={styles.smallcol}>
                                <div className={styles.field}>
                                    <div className={styles.label}>Day</div>
                                    <Dropdown
                                        className={styles.dropdown}
                                        value={day}
                                        setValue={setDay}
                                        options={getDayOptions(month)}
                                    />
                                </div>
                            </div>

                            <div className={styles.smallcol}>
                                <div className={styles.field}>
                                    <div className={styles.label}>Month</div>
                                    <Dropdown
                                        className={styles.dropdown}
                                        value={month}
                                        setValue={setMonth}
                                        options={monthOptions}
                                    />
                                </div>
                            </div>

                            <div className={styles.smallcol}>
                                <div className={styles.field}>
                                    <div className={styles.label}>Year</div>
                                    <Dropdown
                                        className={styles.dropdown}
                                        value={year}
                                        setValue={setYear}
                                        options={yearOptions}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              <div className={styles.foot}>
                <button
                  className={cn("button-stroke tablet-show", styles.button)}
                  onClick={() => setVisiblePreview(true)}
                  type="button"
                >
                  Preview
                </button>
                <button
                  className={cn("button", styles.button)}
                  onClick={async () => { 
                    await handleCreateItem();
                  }}
                  type="button"
                >
                  <span>Create item</span>
                  <Icon name="arrow-next" size="10" />
                </button>
              </div>
            </form>
          </div>
          <Preview
            className={cn(styles.preview, { [styles.active]: visiblePreview })}
            onClose={() => setVisiblePreview(false)}
            songName = {songName}
            mintPrice = {mintPrice}
            thumbnailUrl = {thumbnailUrl}
            songSize = {songSize}
          />
        </div>
      </div>
      {/* <Modal visible={visibleModal} onClose={() => setVisibleModal(false)}>
        <FollowSteps
          className={styles.steps}
          dataUrl={dataUrl}
          metadata={metadataUrl}
          feeNumerator={royaltiesMap[royalties]}
          price={Number(price)}
        />
      </Modal> */}
    </>
  );
};

export default UploadDatasetDetails;